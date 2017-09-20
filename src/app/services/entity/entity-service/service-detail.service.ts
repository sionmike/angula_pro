import {EntityClass} from "../entity.class";
import {Injectable} from "@angular/core";

@Injectable()
export class ServiceDetailService extends EntityClass{
  getDetail(id:number) {
    return super.get(`api/shooter/v1/users/department/309jizhu/items/${id}?dptNum=${localStorage['dpt']}&itemId=${id}`);
  }
}
