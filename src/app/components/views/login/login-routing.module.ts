import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'false',
    pathMatch: 'full'
  },
  {
    path: ':expired',
    component: LoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
