import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'yh-order-refund',
  templateUrl: './order-refund.component.html',
  styleUrls: ['./order-refund.component.scss']
})
export class OrderRefundComponent implements OnInit {
  @Input() orderDetail: any;
  constructor() { }

  ngOnInit() {
  }

}
