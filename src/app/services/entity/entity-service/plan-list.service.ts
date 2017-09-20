import {EntityClass} from "../entity.class";
import {Injectable} from "@angular/core";

@Injectable()
export class PlanListService extends EntityClass {
  getPlanList() {
    return super.get(`api/wbreaker/v1/nurses/article-group-list?dptNum=${localStorage['dpt']}`);
  }

  getPlan(planId: number) {
    let url = `yh-api/ns/plan/details?dptNum=${localStorage['dpt']}&planId=${planId}`;
    if (sessionStorage['orderId'] && sessionStorage['actionId']) {
      url += `&scenarioInfo={
      "orderId":${sessionStorage['orderId']},
      "actionId":${sessionStorage['actionId']}}`;
      url += `&scenarioType=1`;
    }
    return super.get(url);
  }
}
