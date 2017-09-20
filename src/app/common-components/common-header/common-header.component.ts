import {Component, OnInit, Input, AfterViewInit, OnDestroy} from '@angular/core';
import {Router, NavigationEnd} from "@angular/router";
import {ServiceListService} from "../../services/entity/entity-service/service-list.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'yh-common-header',
  templateUrl: './common-header.component.html',
  styleUrls: ['./common-header.component.scss']
})
export class CommonHeaderComponent implements OnInit,AfterViewInit, OnDestroy {
  items: any[];
  user: any;
  serviceList: any[] = [{
      title: '伤口造口',
      subItems: [
        {
          title: '敬请期待',
          id: 3
        }
      ]
    }, {
      title: '新生儿护理',
      subItems: [
        {
          title: '敬请期待',
          id: 1
        }
      ]
    }, {
      title: '中老年护理',
      subItems: [
        {
          title: '敬请期待',
          id: 1
        }
      ]
    }, {
      title: '血糖测定',
      subItems: [
        {
          title: '敬请期待',
          id: 1
        }
      ]
    }];

  @Input() showMenu: boolean = false;
  scrollAfterHeader: boolean = false;
  weeks: any[] = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
  nowDate: number = (new Date()).getTime();
  nowWeekDay: number = (new Date).getDay();
  private subscribe: Subscription;

  constructor(private router: Router, private serviceListService: ServiceListService) {
    this.subscribe = this.serviceListService.getServiceList().subscribe(
      (response: any) => {
        if (response.item && response.item.length > 0) {
          this.items = response.item.map((item) => {
            return {
              id: item.itemId,
              title: item.title,
            }
          });
          this.serviceList.unshift({
            title: '专项护理',
            subItems: this.items
          });
        }
      });
  }

  ngOnInit() {
    this.user = localStorage['userInfo'] ? JSON.parse(localStorage['userInfo']) : '';
  }

  serviceDetailClick(i, subItem) {
    if (i == 0) {
      this.router.navigate(['/service-detail', subItem.id])
    }
  }

  ngAfterViewInit(): void {
    let self = this;
    $(window).scroll(function () {
      self.scrollAfterHeader = $(this).scrollTop() > 400;
    });
  }

  goHomeTarget(targetId) {
    let scrollToTarget = () => {
      let mao = $("#" + targetId); //获得锚点
      let pos = mao.offset().top;
      let poshigh = mao.height();
      $("html,body").animate({scrollTop: pos - poshigh - 60}, 500,);
    };
    if ($("#" + targetId).length > 0) {//判断对象是否存在
      scrollToTarget();
    } else {
      let listener = this.router.events.subscribe((event) => {
        if ((event instanceof NavigationEnd)) {
          scrollToTarget();
          listener.unsubscribe();
        }
      });
      this.router.navigate(['/home']);
    }
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  ngOnDestroy() {
    this.subscribe ? this.subscribe.unsubscribe() : null;
  }
}
