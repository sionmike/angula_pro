import { Injectable } from '@angular/core';
import {ConnectionBackend, XHRBackend, Request, XHRConnection} from "@angular/http";
import {HttpInterceptor} from './http-interceprot.service'

@Injectable()
export class HttpInterceptorBackend  implements ConnectionBackend{
  constructor(private _httpInterceptor:HttpInterceptor, private _xhrBackend:XHRBackend) { }

  createConnection(request: Request): XHRConnection {
    let interceptor=this._httpInterceptor;
    let req=interceptor.beforeRequest?interceptor.beforeRequest(request):request;
    let result=this._xhrBackend.createConnection(req);
    result.response=interceptor.afterResponse?interceptor.afterResponse(result.response):result.response;
    return result;
  }
}
