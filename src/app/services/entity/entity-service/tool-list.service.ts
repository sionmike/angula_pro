import {EntityClass} from "../entity.class";
import {Injectable} from "@angular/core";

@Injectable()
export class ToolListService extends EntityClass{
  getToolList() {
    return super.get(`yh-api/ns/tool-group/list?dptNum=${localStorage['dpt']}`);
  }

  getToolDetail(id: number) {
    let url:string = `yh-api/ns/tool/details?dptNum=${localStorage['dpt']}&toolId=${id}`;
    return super.get(url);
  }

  getAnswer(params:{}) {
    let url = `yh-api/ns/tool/answer?dptNum=${localStorage['dpt']}`;
    console.log(sessionStorage['orderId']);
    console.log(sessionStorage['actionId']);
    if (sessionStorage['orderId'] && sessionStorage['actionId']) {
      url += `&scenarioInfo={
      "orderId":${sessionStorage['orderId']},
      "actionId":${sessionStorage['actionId']}
      }`;
      url += `&scenarioType=1`;
    }
    return super.post(url, params);
  }
}
