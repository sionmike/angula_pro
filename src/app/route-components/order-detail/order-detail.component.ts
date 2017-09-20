import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router'
import {OrderDetailService} from '../../services/entity/entity-service/order-detail.service';
import {Subscription} from "rxjs";

@Component({
  selector: 'yh-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit, OnDestroy {
  private orderDetailSubscribe: Subscription;
  orderList: any[] = [];
  timer;
  time: number;
  orderDetail: any = {
    item: {
      title: '',
      desc: '',
      pic: ''
    },
    status: {
      statusDisplayMsg: '待支付',
    },
    servingTime: null,
    patient: {
      address: '',
      name: '',
      sex: '',
      phone: ''
    },
    nurse: {
      hospital: '',
      title: '',
      score: null,
      name: ''
    }
  };

  constructor(private activatedRoute: ActivatedRoute, private orderDetailService: OrderDetailService) {
    this.activatedRoute.params.subscribe((param: any) => {
      this.orderDetailSubscribe = this.orderDetailService.getOrderDetail(param['orderId']).subscribe(
        (response: any) => {
          this.orderDetail = response;
          let list = JSON.stringify(response);
          this.orderList = [JSON.parse(list)];
          this.orderList = this.orderList.map((item) => {
            let obj = {
              status: item.status.statusDisplayMsg
            };
            return Object.assign(item, obj);
          });
        });
    });
  }

  ngOnInit() {
    if (this.orderDetail['status'].statusDisplayMsg == '待支付') {
      this.timer = setInterval(() => {
        this.time = this.orderDetail['countdownTime'] + this.orderDetail['orderTime'] - (new Date()).getTime();
        this.time--;
        if (this.time <= 0) {
          clearInterval(this.timer);
          location.reload();
        }
      }, 1000);
    }
  }

  ngOnDestroy() {
    clearInterval(this.timer);
    this.orderDetailSubscribe ? this.orderDetailSubscribe.unsubscribe() : null;
  }

}
