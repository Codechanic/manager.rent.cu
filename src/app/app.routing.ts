import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { FramedLayoutComponent } from './components/core/framed-layout/framed-layout.component';

import { P404Component } from './components/shared/error/404.component';
import { P500Component } from './components/shared/error/500.component';
import { LoginComponent } from './components/views/login/login.component';
import { RegisterComponent } from './components/views/register/register.component';
import { AuthGuard } from './guards/auth.guard';

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
      breadcrumb: 'Page 404',
    },
  },
  {
    path: '500',
    component: P500Component,
    data: {
      breadcrumb: 'Page 500',
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
    path: 'register',
    loadChildren: () => import('./components/views/register/register.module').then(m => m.RegisterModule),
  },
  {
    path: '',
    component: FramedLayoutComponent,
    children: [
      {
        path: 'houses',
        data: {
          breadcrumb: 'Houses',
        },
        loadChildren: () => import('./components/views/houses/houses.module').then(m => m.HousesModule),
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
