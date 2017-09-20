import {EntityClass} from "../entity.class";
import {Injectable} from "@angular/core";

@Injectable()
export class OrderSubmitService extends EntityClass{
  getPatientInfo(id: number) {
    return super.get(`api/shooter/v1/users/orders/place-order/items/${id}?dptNum=${localStorage['dpt']}&itemId=${id}`);
  }

  getRelationList() {
    return super.get(`api/shooter/v1/users/patient-relation?dptNum=${localStorage['dpt']}`);
  }

  orderSumit(id: number,params:{}) {
    return super.post(`api/shooter/v1/users/orders/place-order?dptNum=${localStorage['dpt']}&itemId=${id}`, params)
  }

  delPatient(id: number) {
    return super.del(`api/shooter/v1/users/delete/user-addresses/${id}?dptNum=${localStorage['dpt']}`);
  }

  addPatient(params:{}) {
    return super.post(`api/shooter/v1/users/user-addresses?dptNum=${localStorage['dpt']}`, params);
  }

  editpatient(id: number,params:{}) {
    return super.patch(`api/shooter/v1/users/update/user-addresses/${id}?dptNum=${localStorage['dpt']}`, params);
  }
}
