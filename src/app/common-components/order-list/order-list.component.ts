import {Component, OnInit, Input, OnDestroy, ElementRef} from '@angular/core';
import {OrderDetailService} from '../../services/entity/entity-service/order-detail.service';
import {Subscription} from "rxjs";

@Component({
  selector: 'yh-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit,OnDestroy {
  @Input() orderList: any = {};
  @Input() type: string;
  num: number = 5;
  evaData: any = {
    orderId: null,
    evaluateContent: '',
    score: null
  };
  refundData: any = {
    orderId: null,
    reason: -1,
    price: null,
    explain: ''
  };
  reasons: any[];
  maxPrice: string;
  showModal: boolean = false;
  modalType: string = '';
  private subscribe: Subscription[] = [];
  payModal: boolean = false;
  number: number = 0;

  constructor(private orderDetailService: OrderDetailService, private elementRef:ElementRef) {
  }

  ngOnInit() {
    if (this.type == 'detail') {
      if (this.orderList[0].status == '服务中') {
        let sub: Subscription = this.orderDetailService.getRefundReason(this.orderList[0].orderId).subscribe(
          (response: any) => {
            this.reasons = response.reason;
            this.maxPrice = response.price;
            this.reasons.unshift({
              id: -1,
              title: '请选择退款原因'
            });
            this.evaData['orderId'] = this.orderList[0].orderId;
            this.refundData['orderId'] = this.orderList[0].orderId;
          });
        this.subscribe.push(sub);
      }
    }
  }

  onComplainClick() {
    swal({
      title: "申诉须知",
      html: false,
      text: "请拨打电话：400-018-6916",
      confirmButtonColor: "#00BABF",
      showCancelButton: false,
      confirmButtonText: "确定",
    });
  }

  onCancelOrderClick() {
    swal({
      title: "提醒",
      html: false,
      text: "确定取消订单吗？",
      confirmButtonColor: "#00BABF",
      showCancelButton: true,
      confirmButtonText: "确定",
      cancelButtonText: "取消"
    }, () => {
      let sub: Subscription = this.orderDetailService.cancelOrder(this.orderList[0].orderId).subscribe(
        (response: any) => {
          if (response.result.success == true) {
            swal({
              title: "提醒",
              text: "取消订单成功！",
              confirmButtonColor: "#00BABF",
              showCancelButton: false,
              confirmButtonText: "确定",
            }, () => {
              location.reload();
            });
          }
        });
      this.subscribe.push(sub);
    });
  }

  onCancelRefundClick() {
    swal({
      title: "提醒",
      html: false,
      text: "确定取消退款吗？",
      confirmButtonColor: "#00BABF",
      showCancelButton: true,
      confirmButtonText: "确定",
      cancelButtonText: "取消"
    }, () => {
      let sub: Subscription = this.orderDetailService.cancelRefund(this.orderList[0].orderId).subscribe(
        (response: any) => {
          swal({
            title: "提醒",
            text: "取消退款成功",
            confirmButtonColor: "#00BABF",
            showCancelButton: false,
            confirmButtonText: "确定",
          }, () => {
            location.reload();
          });
        });
      this.subscribe.push(sub);
    });
  }

  cancelPayment() {
    this.payModal = false;
    location.reload();
  }

  onPayOrderClick() {
    this.number += 1;
    if (this.number >= 2) {
      this.number -= 1;
      return false;
    }
    let sub: Subscription = this.orderDetailService.payOrder(this.orderList[0].orderId).subscribe(
      (response: any) => {
        this.payModal = true;
        let charge = JSON.parse(response.chargeJson);
        setTimeout(() => {
          var qrcode = new QRCode(this.elementRef.nativeElement.querySelector('#qrcode'), {
            width: 200,
            height: 200
          });
          qrcode.makeCode(charge.credential['wx_pub_qr']);
        }, 500);
      });
    this.subscribe.push(sub);
  }

  onFinishPaymenntclick() {
    this.payModal = false;
    location.reload();
  }

  onOrderRefundClick() {
    this.showModal = true;
    this.modalType = 'refund';
  }

  onOrderEvaCLick() {
    this.showModal = true;
    this.modalType = 'eva';
  }

  onSubmit() {
    this.showModal = false;
    if (this.modalType == 'refund') {
      if (this.refundData['reason']) {
        this.refundData['reason'] = parseInt(this.refundData['reason']);
        if (this.refundData['reason'] < 0) {
          swal({
            title: "提醒",
            text: "请选择退款原因",
            type: 'error',
            confirmButtonColor: "#00BABF",
            showCancelButton: false,
            confirmButtonText: "确定",
          });
          return false;
        }
      }
      if (!this.refundData['price'] || this.refundData['price'] > this.maxPrice) {
        swal({
          title: "提醒",
          text: "请检查输入退款金额",
          type: 'error',
          confirmButtonColor: "#00BABF",
          showCancelButton: false,
          confirmButtonText: "确定",
        });
        return false;
      }
      this.refundData['price'] = this.refundData['price'] * 100;
      let sub: Subscription = this.orderDetailService.orderRefund(this.orderList[0].orderId, this.refundData).subscribe(
        (response: any) => {
          swal({
            title: "提醒",
            text: "申请退款成功",
            confirmButtonColor: "#00BABF",
            showCancelButton: false,
            confirmButtonText: "确定",
          }, () => {
            location.reload();
          });
        });
      this.subscribe.push(sub);
    } else {
      this.evaData['score'] = this.num * 20;
      let sub: Subscription = this.orderDetailService.orderEva(this.orderList[0].orderId, this.evaData).subscribe(
        (response: any) => {
          swal({
            title: "提醒",
            text: "评价成功",
            confirmButtonColor: "#00BABF",
            showCancelButton: false,
            confirmButtonText: "确定",
          }, () => location.reload());
        });
      this.subscribe.push(sub);
    }
    this.modalType = '';
  }

  ngOnDestroy() {
    for (let sub of this.subscribe) {
      sub.unsubscribe();
    }
  }

}
