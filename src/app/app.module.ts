import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule, RequestOptions} from '@angular/http';

import {AppComponent} from './app.component';
import {RouterModule} from "@angular/router";
import {ROOT_ROUTES} from "./app.routes";
import {CustomRequestOptions} from './services/http/custom-request-options.service';

// common-component
import {CommonHeaderComponent} from './common-components/common-header/common-header.component';
import {CommonFooterComponent} from './common-components/common-footer/common-footer.component';
import {ServiceItemComponent} from './common-components/service-item/service-item.component';
import {ToolItemComponent} from './common-components/tool-item/tool-item.component';
import {ArticleItemComponent} from './common-components/article-item/article-item.component';
import {OrderListComponent} from './common-components/order-list/order-list.component';
import {OrderDetailComponent} from './route-components/order-detail/order-detail.component';
import {OrderCloseComponent} from './common-components/order-detail/order-close/order-close.component';
import {OrderCancelComponent} from './common-components/order-detail/order-cancel/order-cancel.component';
import {ServiceActionComponent} from './common-components/order-detail/service-action/service-action.component';
import {OrderDetailUserComponent} from './common-components/order-detail/order-detail-user/order-detail-user.component';
import {OrderRefundComponent} from './common-components/order-detail/order-refund/order-refund.component';

// route-component
import {HomeRouteComponent} from './route-components/home/home.component';
import {ServiceDetailRouteComponent} from './route-components/service-detail/service-detail.component';
import {ArticleListRouteComponent} from './route-components/article-list/article-list.component';
import {ArticleDetailRouteComponent} from './route-components/article-detail/article-detail.component';
import {ToolDetailRouteComponent} from './route-components/tool-detail/tool-detail.component';
import {OrderSubmitRouteComponent} from './route-components/order-submit/order-submit.component';
import {OrderListRouteComponent} from './route-components/order-list/order-list.component';
import {LoginComponent} from './route-components/login/login.component';
import {RegisterComponent} from './route-components/register/register.component';
import {StreetPickerComponent} from './route-components/street-picker/street-picker.component';
import {RegionPickerComponent} from './route-components/region-picker/region-picker.component';

// entity-service
import {ServiceDetailService} from './services/entity/entity-service/service-detail.service';
import {OrderListService} from "./services/entity/entity-service/order-list.service";
import {OrderDetailService} from "./services/entity/entity-service/order-detail.service";
import {ToolListService} from "./services/entity/entity-service/tool-list.service";
import {PlanListService} from "./services/entity/entity-service/plan-list.service";
import {OrderSubmitService} from "./services/entity/entity-service/order-submit.service";
import {LoginService} from "./services/entity/entity-service/login.service";
import {ServiceListService} from './services/entity/entity-service/service-list.service';

@NgModule({
  declarations: [
    AppComponent,

    CommonHeaderComponent,
    CommonFooterComponent,
    ServiceItemComponent,
    ToolItemComponent,
    ArticleItemComponent,
    OrderListComponent,

    HomeRouteComponent,
    ServiceDetailRouteComponent,
    ArticleListRouteComponent,
    ArticleDetailRouteComponent,
    ToolDetailRouteComponent,
    OrderSubmitRouteComponent,
    OrderListRouteComponent,
    LoginComponent,
    RegisterComponent,
    OrderDetailComponent,
    OrderCloseComponent,
    OrderCancelComponent,
    ServiceActionComponent,
    OrderDetailUserComponent,
    OrderRefundComponent,
    StreetPickerComponent,
    RegionPickerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,

    RouterModule.forRoot(ROOT_ROUTES)
  ],
  providers: [
    ServiceListService,
    ServiceDetailService,
    OrderListService,
    OrderDetailService,
    ToolListService,
    PlanListService,
    OrderSubmitService,
    LoginService,
    {provide: RequestOptions, useClass: CustomRequestOptions}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
