import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'yh-order-cancel',
  templateUrl: './order-cancel.component.html',
  styleUrls: ['./order-cancel.component.scss']
})
export class OrderCancelComponent implements OnInit {
  @Input() orderDetail: any;
  closeContent: string = '<div>';
  constructor() {
  }
  ngOnInit() {
    if (this.orderDetail['status'].content.detail !== undefined) {
      let detail = this.orderDetail['status'].content.detail.split('\n');
      for (let i = 0; i < detail.length; i++) {
        if (i != detail.length - 1) {
          this.closeContent += '<p class="h4 line-height">' + detail[i] + '</p>';
        } else {
          this.closeContent += '<p class="margin-top-md h4 line-height">' + '<div>' + detail[i] + '</div>' + '</p>';
        }
      }
    }
    this.closeContent = this.closeContent + '</div>';
  }

}
