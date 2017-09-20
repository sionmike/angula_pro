import {EntityClass} from "../entity.class";
import {Injectable} from "@angular/core";

@Injectable()
export class ServiceListService extends EntityClass{
  getServiceList() {
    let url:string = `api/shooter/v1/users/department/${localStorage['dpt']}/items?dptNum=${localStorage['dpt']}`;
    return super.get(url);
  }

  getLocalService() {
    return super.request('../../../../assets/data/service-list.json');
  }
}
