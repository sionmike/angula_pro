import {EntityClass} from "../entity.class";
import {Injectable} from "@angular/core";

@Injectable()
export class OrderListService extends EntityClass{
  getOrderList(type: string) {
    return super.get(`api/shooter/v1/users/orders?dptNum=${localStorage['dpt']}&index=0&size=500&status=${type}`);
  }
}
