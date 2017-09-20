import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PlanListService} from '../../services/entity/entity-service/plan-list.service';
import {Subscription} from "rxjs";

@Component({
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss']
  // encapsulation: ViewEncapsulation.None
})
export class ArticleDetailRouteComponent implements OnInit, OnDestroy {
  content: string;
  private planListSubscribe: Subscription;

  constructor(private activatedRoute: ActivatedRoute, private planListService: PlanListService) {
    this.activatedRoute.params.subscribe(
      (params: any) => {
        this.planListSubscribe = this.planListService.getPlan(params['articleId']).subscribe((response: any) => {
          if (response.plan) {
            this.content = response.plan.planContent;
          }
        });
      });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.planListSubscribe ? this.planListSubscribe.unsubscribe() : null;
  }

}
