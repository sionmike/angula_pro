import {Component, OnInit, OnDestroy, AfterViewInit, ElementRef} from '@angular/core';
import {LoginService} from '../../services/entity/entity-service/login.service';
import {Subscription} from "rxjs";

@Component({
  selector: 'yh-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit,OnDestroy, AfterViewInit {
  loginData: any = {
    phone: '',
    captcha: null
  };
  title: string = '重新获取(30)';
  showTitle: boolean = false;
  timer;
  private subscribes: Subscription[] = [];

  constructor(private loginService: LoginService, private elementRef: ElementRef) {
  }

  ngOnInit() {
    localStorage['dpt'] = 'hf-yxhlb';
    let height = $(this.elementRef.nativeElement.querySelector('.layer')).height();
    $(this.elementRef.nativeElement.querySelector('.layer-wapper')).css('marginTop', (height - 366 - 80) / 2);
  }

  ngAfterViewInit() {
  }

  login() {
    if (!this.loginData['captcha']) {
      swal({
        title: "提示",
        type: 'error',
        text: "验证码不能为空！",
        confirmButtonColor: "#00BABF",
        showCancelButton: false,
        confirmButtonText: "确定",
      });
      return false;
    }
    let sub:Subscription = this.loginService.login(this.loginData).subscribe((response: any) => {
      localStorage['userInfo'] = JSON.stringify(response.userInfo);
      localStorage['token'] = response.userInfo.token;
      if (response.needModify == true) {
        location.href = '/register';
      } else {
        location.href = '/region-picker';
      }
    });
    this.subscribes.push(sub);
  }

  getCode() {
    if (!this.loginData['phone']) {
      swal({
        title: "提示",
        type: 'error',
        text: "手机号码不能为空！",
        confirmButtonColor: "#00BABF",
        showCancelButton: false,
        confirmButtonText: "确定",
      });
      return false;
    }
    let sub:Subscription = this.loginService.getCaptcha({phone: this.loginData['phone']}).subscribe(
      (response: any) => {
        this.showTitle = true;
        let d = 30;
        this.timer = setInterval(() => {
          d -= 1;
          this.title = '重新获取(' + d + ')';
          if (d <= 0) {
            this.title = '重新获取(30)';
            this.showTitle = false;
            clearInterval(this.timer);
          }
        }, 1000);
      });
    this.subscribes.push(sub);
  }

  ngOnDestroy() {
    clearInterval(this.timer);
    for(let sub of this.subscribes) {
      sub.unsubscribe();
    }
  }

}
