import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { LocationStrategy, HashLocationStrategy } from "@angular/common";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { JwtInterceptor } from "./interceptors/jwt.interceptor";

import { AppComponent } from "./app.component";

// Import containers
import { FramedLayoutComponent } from "./components/core/framed-layout/framed-layout.component";

// Import local and core components
import { LoginComponent } from "./components/views/login/login.component";
import { P404Component } from "./components/shared/error/404.component";
import { P500Component } from "./components/shared/error/500.component";
import { CustomBreadcrumbComponent } from './components/core/custom-breadcrumb/custom-breadcrumb.component'

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

import { registerLocaleData } from '@angular/common';
import localeEsCu from '@angular/common/locales/es-CU';
import { BreadcrumbModule } from "angular-crumbs";

registerLocaleData(localeEsCu, 'es');
// Here you can import more locales if needed

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    BreadcrumbModule,
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
    ChartsModule
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    P404Component,
    P500Component,
    CustomBreadcrumbComponent,
    FramedLayoutComponent
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
