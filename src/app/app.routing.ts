import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { FramedLayoutComponent } from './containers/framed-layout/framed-layout.component';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { AuthGuard } from './services/auth.guard';
import { ComingSoonComponent } from "./views/coming-soon/coming-soon.component";

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'houses',
    pathMatch: 'full'
  },
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404',
    },
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500',
    },
  },
  {
    path: 'login',
    children:[
      {
        path: '',
        redirectTo: 'false',
        pathMatch: 'full'
      },
      {
        path: ':expired',
        component: LoginComponent,
      },
    ],
  },
  {
    path: 'coming-soon',
    component: ComingSoonComponent,
    data: {
      title: 'Coming Soon'
    }
  },
  {
    path: 'register',
    loadChildren: () => import('./views/register/register.module').then(m => m.RegisterModule),
  },
  {
    path: '',
    component: FramedLayoutComponent,
    data: {
      title: 'Home',
    },
    children: [
      {
        path: 'houses',
        loadChildren: () => import('./views/manager/manager.module').then(m => m.ManagerModule),
        canLoad: [AuthGuard],
      },
    ],
  },
  { path: '**', component: P404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
