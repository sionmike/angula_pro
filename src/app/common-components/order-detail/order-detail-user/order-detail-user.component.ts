import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'yh-order-detail-user',
  templateUrl: './order-detail-user.component.html',
  styleUrls: ['./order-detail-user.component.scss']
})
export class OrderDetailUserComponent implements OnInit {
  @Input() orderDetail: any;
  num: number;

  constructor() {
  }

  ngOnInit() {
    this.num = this.orderDetail['nurse'].score/20;
  }

}
