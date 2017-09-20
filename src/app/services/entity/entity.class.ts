import {Entity} from "./entity.interface";
import {Observable} from "rxjs";
import {Http} from "@angular/http";
import {environment} from "../../../environments/environment";
import {Injectable} from "@angular/core";
import {Router} from '@angular/router';
import 'rxjs/Rx';

@Injectable()
export class EntityClass implements Entity {

  constructor(private http: Http, public router: Router) {
  }

  private mapping(response: any) {
    if (response.result) {
      if (response.result.success==true) {
        return response;
      } else {
        if (response.result.code == 401) {
          localStorage.clear();
          this.router.navigateByUrl('/login');
        } else if (response.result.code == 403) {
          swal({
              title: "权限错误?",
              text: "请重新登录后重试",
              type: "warning",
              showCancelButton: false,
              confirmButtonText: "确定",
              closeOnConfirm: false
            },
            () => {
              this.router.navigateByUrl('/login');
            });
        } else if (response.result.code == 500) {
          swal("服务器错误", response.result.displaymsg, "error");
        } else if (response.result.displaymsg) {
          swal("请求错误", response.result.displaymsg, "error");
        }
        throw {result: response.result};
      }
    } else {
      return response;
    }
  }

  get(url: string): Observable<any> {
    return this.http.get(environment.baseUrl + url)
      .map((response) => {
        return this.mapping(response.json());
      })
      .map((response) => {
        response.data = response.data || [];
        return response;
      });
  }

  post(url: string, params: {}): Observable<any> {
    return this.http.post(environment.baseUrl + url, params)
      .map((response) => {
        return this.mapping(response.json());
      })
      .map((response) => {
        return response;
      });
  }

  put(url: string, params: {}): Observable<any> {
    return this.http.put(environment.baseUrl + url, params)
      .map((response) => {
        return this.mapping(response.json());
      })
      .map((response) => {
        return response;
      });
  }

  patch(url: string, params?: {}): Observable<any> {
    return this.http.patch(environment.baseUrl + url, params)
      .map((response) => {
        return this.mapping(response.json());
      })
      .map((response) => {
        return response;
      });
  }

  del(url: string): Observable<any> {
    return this.http.delete(environment.baseUrl + url)
      .map((response) => {
        return this.mapping(response.json());
      })
      .map((response) => {
        return response;
      });
  }

  request(url: string) {
    return this.http.request(url)
      .map(res => res.json());
  }
}
