import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManagerComponent } from './manager.component';
import { AuthGuard } from '../../services/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: ManagerComponent,
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
export class ManagerRoutingModule {
}
