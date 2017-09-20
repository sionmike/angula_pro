import {Component, OnInit, AfterViewInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ServiceDetailService} from '../../services/entity/entity-service/service-detail.service';
import {Subscription} from "rxjs";

@Component({
  templateUrl: './service-detail.component.html',
  styleUrls: ['./service-detail.component.scss']
})
export class ServiceDetailRouteComponent implements OnInit,AfterViewInit,OnDestroy {
  serviceDetail: any = {
    img: '',
    title: '',
    time: '',
    price: '',
    detail: '',
    serviceDetail: '',
    action: []
  };
  private serviceDetailSubscribe: Subscription;

  constructor(private activatedRoute: ActivatedRoute, private serviceDetailService: ServiceDetailService) {
    activatedRoute.params.subscribe((param: any) => {
      this.serviceDetailSubscribe = this.serviceDetailService.getDetail(param['serviceId']).subscribe((response: any) => {
        let serviceDetail: string = response.item.serviceDetail.replace(/<h3/g, '<h3 class="font-color-green padding-height-xs"');
        this.serviceDetail = {
          id: response.item.itemId,
          img: response.item.pic,
          title: response.item.title,
          time: response.item.period,
          price: response.item.price,
          detail: response.item.desc,
          serviceDetail: serviceDetail.replace(/<p/g, '<p class="h4"'),
          action: response.item.action
        };
      });
    });
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy() {
    this.serviceDetailSubscribe ? this.serviceDetailSubscribe.unsubscribe() : null;
  }

}
