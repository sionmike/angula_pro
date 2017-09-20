import {Routes} from "@angular/router";
import {HomeRouteComponent} from './route-components/home/home.component';
import {ServiceDetailRouteComponent} from './route-components/service-detail/service-detail.component';
import {ArticleListRouteComponent} from './route-components/article-list/article-list.component';
import {ArticleDetailRouteComponent} from './route-components/article-detail/article-detail.component';
import {ToolDetailRouteComponent} from './route-components/tool-detail/tool-detail.component';
import {OrderSubmitRouteComponent} from './route-components/order-submit/order-submit.component';
import {OrderListRouteComponent} from './route-components/order-list/order-list.component';
import {LoginComponent} from "./route-components/login/login.component";
import {RegisterComponent} from "./route-components/register/register.component";
import {OrderDetailComponent} from "./route-components/order-detail/order-detail.component";
import {StreetPickerComponent} from "./route-components/street-picker/street-picker.component";
import {RegionPickerComponent} from "./route-components/region-picker/region-picker.component";

export const ROOT_ROUTES: Routes = [
  // Main redirect
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  // App views
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'home', component: HomeRouteComponent},
  {path: 'service-detail/:serviceId', component: ServiceDetailRouteComponent},
  {path: 'article-list', component: ArticleListRouteComponent},
  {path: 'article-detail/:articleId', component: ArticleDetailRouteComponent},
  {path: 'plan-detail/:articleId', component: ArticleDetailRouteComponent},
  {path: 'tool-detail/:toolId', component: ToolDetailRouteComponent},
  {path: 'order-submit/:serviceId', component: OrderSubmitRouteComponent},
  {path: 'order-list', component: OrderListRouteComponent},
  {path: 'order-detail/:orderId', component: OrderDetailComponent},
  {path: 'region-picker', component: RegionPickerComponent},
  {path: 'street-picker/:id', component: StreetPickerComponent},
  // Handle all other routes
  {path: '**', redirectTo: 'login', pathMatch: 'full'}
];
