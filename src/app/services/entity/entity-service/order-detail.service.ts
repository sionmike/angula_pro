import {EntityClass} from "../entity.class";
import {Injectable} from "@angular/core";

@Injectable()
export class OrderDetailService extends EntityClass{
  getOrderDetail(id: number) {
    return super.get(`api/shooter/v1/users/orders/${id}?dptNum=${localStorage['dpt']}&orderId=${id}`);
  }

  getRefundReason(id: number,) {
    return super.get(`api/shooter/v1/users/orders/${id}/request-refund/page-info?dptNum=${localStorage['dpt']}&orderId=${id}`);
  }

  orderRefund(id: number, params: {}) {
    return super.post(`api/shooter/v1/users/orders/request-refund?dptNum=${localStorage['dpt']}&orderId=${id}`, params);
  }

  orderEva(id:number, params: {}) {
    return super.post(`api/shooter/v1/users/orders/review?dptNum=${localStorage['dpt']}&orderId=${id}`, params);
  }

  payOrder(id: number) {
    return super.patch(`api/shooter/v1/users/orders/${id}/pay?channel=wx_pub_qr&dptNum=${localStorage['dpt']}&orderId=${id}`);
  }

  cancelOrder(id: number) {
    return super.patch(`api/shooter/v1/users/orders/${id}/cancel?dptNum=${localStorage['dpt']}&orderId=${id}`);
  }

  cancelRefund(id: number) {
    return super.patch(`api/shooter/v1/users/orders/${id}/refund/cancel?dptNum=${localStorage['dpt']}&orderId=${id}`);
  }
}
