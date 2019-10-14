import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { LocationStrategy, HashLocationStrategy } from "@angular/common";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { JwtInterceptor } from "./interceptors/jwt.interceptor";

import { AppComponent } from "./app.component";

// Import containers
import { FramedLayoutComponent } from "./containers/framed-layout/framed-layout.component";

// Import local components
import { LoginComponent } from "./views/login/login.component";
import { P404Component } from "./views/error/404.component";
import { P500Component } from "./views/error/500.component";
import { ComingSoonComponent } from './views/coming-soon/coming-soon.component';

import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule
} from "@coreui/angular";

// Import routing module
import { AppRoutingModule } from "./app.routing";

// Import 3rd party components
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { TabsModule } from "ngx-bootstrap/tabs";
import { ChartsModule } from "ng2-charts";
import { CookieService } from "ngx-cookie-service";
import { ReactiveFormsModule } from "@angular/forms";
import { AlertModule } from "ngx-bootstrap";
import {CountdownModule} from "ng2-date-countdown";

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    HttpClientModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ReactiveFormsModule,
    AlertModule.forRoot(),
    ChartsModule,
    CountdownModule
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    P404Component,
    P500Component,
    FramedLayoutComponent,
    ComingSoonComponent
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
