import {Component, OnInit, OnDestroy} from '@angular/core';
import {OrderListService} from '../../services/entity/entity-service/order-list.service';
import {Subscription} from "rxjs";

@Component({
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListRouteComponent implements OnInit,OnDestroy {
  orderList: any[] = [];
  private orderListSubscribe: Subscription;
  orderListFilted: any[] = this.orderList;
  filterStatus: string[] = [''];
  selIndex: number = 0;

  constructor(private orderListService: OrderListService) {
    this.orderListSubscribe = this.orderListService.getOrderList('allList').subscribe(
      (response: any) => {
        this.orderList = response.order ? response.order : [];
        this.orderList = this.orderList.map((item) => {
          let obj: {} = {};
          if (item.status) {
            obj = {
              status: item.status.statusDisplayMsg
            };
          }
          return Object.assign(item, obj);
        });
        this.orderListFilted = this.orderList;
      });
  }

  changeFilterStatus(filterStatus, index) {
    this.selIndex = index;
    this.filterStatus = filterStatus;
    let type: string;
    if (index == 0) {
      type = 'allList';
    } else if (index == 1) {
      type = 'serving';
    } else if (index == 2) {
      type = 'refunding';
    } else if (index == 3) {
      type = 'finish';
    }
    this.orderListSubscribe = this.orderListService.getOrderList(type).subscribe(
      (response: any) => {
        this.orderListFilted = response.order ? response.order : [];
        this.orderListFilted = this.orderListFilted.map((item) => {
          let obj: {} = {};
          if (item.status) {
            obj = {
              status: item.status.statusDisplayMsg
            };
          }
          return Object.assign(item, obj);
        });
      });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.orderListSubscribe ? this.orderListSubscribe.unsubscribe() : null;
  }

}
