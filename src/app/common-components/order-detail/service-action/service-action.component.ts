import {Component, OnInit, Input} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'yh-service-action',
  templateUrl: './service-action.component.html',
  styleUrls: ['./service-action.component.scss']
})
export class ServiceActionComponent implements OnInit {
  @Input() orderDetail: any;

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  onContentClick(action, content) {
    sessionStorage['orderId'] = this.orderDetail['orderId'];
    sessionStorage['actionId'] = action.actionId;
    if (action.actionType == 5) {
      this.router.navigate(['/plan-detail', content.id]);
    } else if (action.actionType == 6) {
      if (content.status.progress.buttonMsg == '未自测') {
        this.router.navigate(['/tool-detail', content.id]);
      } else {
        swal({
          title: content.content.title,
          html: true,
          text: "<h4 class='text-justify font-color-global-lighter margin-width-sm'>" + content.content.detail + "</h4>",
          confirmButtonColor: "#00BABF",
          confirmButtonText: "确定",
        });
      }
    }
  }

}
