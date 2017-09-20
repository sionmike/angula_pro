import {Component, OnInit, AfterViewInit, OnDestroy} from '@angular/core';
import {ServiceListService} from '../../services/entity/entity-service/service-list.service';
import {ToolListService} from '../../services/entity/entity-service/tool-list.service';
import {PlanListService} from '../../services/entity/entity-service/plan-list.service';
import {Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  // animations: [routerTransition()],
  // host: {'[@routerTransition]': ''}
})
export class HomeRouteComponent implements OnInit, AfterViewInit, OnDestroy {
  private subscribe: Subscription[] = [];
  serviceList: any[] = [];
  toolArray: any[] = [];
  toolList: any[] = [];
  articleArray: any[] = [];
  CommunityData: any;
  datas: any[] = [];
  serviceArray: any[] = [];
  street: string;

  constructor(private serviceListService: ServiceListService, private toolListService: ToolListService, private router: Router, private planListService: PlanListService) {
    localStorage['street'] = localStorage['street'] || 'luyang1';
    let sub1: Subscription = this.serviceListService.getLocalService().subscribe((response: any) => {
      this.serviceArray = response.service;
      this.datas = response.community;
      this.CommunityData = this.datas.filter((item) => {
        return item.id == localStorage['street'];
      })[0];
      setTimeout(() => {
        let s1 = new Swiper('.home-service-swiper', {
          pagination: '',
          slidesPerView: 4,
          spaceBetween: 30,
          loop: false,
          autoplay: 0,
          paginationClickable: true
        });
      }, 500);
    });
    let sub2: Subscription = this.serviceListService.getServiceList().subscribe((response: any) => {
      this.serviceList = response.item.map((item) => {
        return {
          id: item.itemId,
          img: item.pic,
          title: item.title,
          price: item.price,
          detail: item.desc
        }
      }).slice(0, 4);

    });
    let sub3: Subscription = this.toolListService.getToolList().subscribe((response: any) => {
      this.toolList = response.toolGroup.map((item) => {
        let tools: any[] = item.tools.map((tool) => {
          return {
            id: tool.toolId,
            title: tool.toolName,
            icon: tool.icon
          }
        });
        return {
          id: item.id,
          title: item.name,
          icon: item.icon,
          items: tools
        }
      });
      if (this.toolList.length > 1 && this.toolList[1].items) {
        this.toolArray = this.toolList[1].items;
      }
      setTimeout(() => {
        let s2 = new Swiper('.home-tool-list', {
          pagination: '.home-tool-list-pagination',
          slidesPerView: 6,
          slidesPerColumn: 2,
          spaceBetween: 30,
          loop: false,
          autoplay: 5000,
          paginationClickable: true
        });
      }, 500);
    });
    let sub4: Subscription = this.planListService.getPlanList().subscribe((response: any) => {
      let planArray: any[] = response.articleGroup.filter((item) => {
        return item.url
      }).slice(0, 4);
      planArray = planArray.map((item) => {
        item.article = item.article ? item.article.slice(0, 2) : [];
        return item;
      });
      this.articleArray = planArray;
    });
    this.subscribe.push(sub1);
    this.subscribe.push(sub2);
    this.subscribe.push(sub3);
    this.subscribe.push(sub4);
  }

  ngAfterViewInit(): void {
  }

  ngOnInit() {
    if (!localStorage['street'] || localStorage['street'] == '') {
      this.router.navigate(['/region-picker']);
    }
    this.street = localStorage['street'];
  }

  ngOnDestroy() {
    for (let sub of this.subscribe) {
      sub.unsubscribe();
    }
  }

}
