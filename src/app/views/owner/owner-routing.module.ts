import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OwnerComponent } from './owner.component';
import { AuthGuard } from '../../services/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: OwnerComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('../houses/houses.module').then(m => m.HousesModule),
        canLoad: [AuthGuard],
      },
    ],
    canLoad: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OwnerRoutingModule {
}
