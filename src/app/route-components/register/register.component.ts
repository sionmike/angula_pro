import {Component, OnInit, AfterViewInit, ElementRef, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from '../../services/entity/entity-service/login.service';
import {Subscription} from "rxjs";

@Component({
  selector: 'yh-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, AfterViewInit, OnDestroy {
  areas: any[] = [
    {area: '巢湖市'},
    {area: '居巢区'},
    {area: '庐江县'},
    {area: '瑶海区'},
    {area: '庐阳区'},
    {area: '蜀山区'},
    {area: '包河区'},
    {area: '长丰县'},
    {area: '肥东县'},
    {area: '肥西县'},
    {area: '高新区'},
    {area: '中区'},
    {area: '其它区'}
  ];
  registerData: any = {
    phone: null,
    name: null,
    gender: null,
    birthday: null,
    idCard: null,
    country: '',
    detailedAddress: ''
  };
  private userId: number;
  private subscribe: Subscription;

  constructor(private router: Router, private elementRef: ElementRef, private loginService: LoginService) {
  }

  ngOnInit() {
    if (localStorage['userInfo']) {
      let userData = JSON.parse(localStorage['userInfo']);
      let date = userData['birthday'] ? new Date(userData['birthday']) : null;
      if (date) {
        let d: string = date.getFullYear() + '-' + (date.getMonth() < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth()) + 1) + '-' + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
        this.registerData['birthday'] = d;
      }
      if (userData['gender']) {
        if (userData['gender'] == '1') {
          $(this.elementRef.nativeElement.querySelector('#sex1')).iCheck('check');
        } else {
          $(this.elementRef.nativeElement.querySelector('#sex0')).iCheck('check');
        }
      } else {
        $(this.elementRef.nativeElement.querySelector('#sex1')).iCheck('check');
      }
      this.userId = parseInt(userData['userId']);
      this.registerData['phone'] = userData['phone'] ? userData['phone'] : '';
      this.registerData['name'] = userData['name'] ? userData['name'] : '';
      this.registerData['idCard'] = userData['idCard'] ? userData['idCard'] : '';
      if (userData['address'] && userData['address'].country) {
        this.registerData['country'] = userData['address'].country ? userData['address'].country : '';
      }
      if (userData['address'] && userData['address'].detailedAddress) {
        this.registerData['detailedAddress'] = userData['address'].detailedAddress ? userData['address'].detailedAddress : '';
      }
    }
    let height = $(this.elementRef.nativeElement.querySelector('.layer')).height();
    $(this.elementRef.nativeElement.querySelector('.layer-wapper')).css('marginTop', (height - 630 - 80) / 2 > 0 ? (height - 630 - 80) / 2 : 40);
  }

  ngAfterViewInit() {
    $('input').iCheck({
      checkboxClass: 'icheckbox_square-green',
      radioClass: 'iradio_square-green'
    });
  }

  register() {
    this.registerData['gender'] = $(this.elementRef.nativeElement.querySelector('#sex1'))[0]['checked'] ? '1' : '0';
    this.registerData['birthday'] = new Date(this.registerData['birthday']).getTime();
    this.subscribe = this.loginService.register(this.userId, this.registerData).subscribe((response: any) => {
      localStorage['userInfo'] = JSON.stringify(response.userInfo);
      this.router.navigate(['/region-picker']);
    });
  }

  ngOnDestroy() {
    this.subscribe ? this.subscribe.unsubscribe() : null;
  }

}
