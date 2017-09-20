import {Observable} from "rxjs";
export interface Entity {
  get(url: string): Observable<any> ;
  post(url: string, params: {}): Observable<any> ;
  put(url: string, params: {}): Observable<any> ;
  patch(url: string, params: {}): Observable<any> ;
  del(url: string): Observable<any> ;
}
