import {RequestOptions, Headers, RequestMethod} from "@angular/http";
import {Injectable} from "@angular/core";
@Injectable()
export class CustomRequestOptions extends RequestOptions {
  constructor() {
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE,PATCH, OPTIONS');
    headers.append('Access-Control-Allow-Headers', 'X-Requested-With');
    headers.append('Content-Type', 'application/json');
    headers.append('crossDomain', 'true');
    headers.append('Authorization', localStorage['token'] ? localStorage['token'].replace("\"", "") : '');
    super({method: RequestMethod.Get, headers: headers});
  }
}
