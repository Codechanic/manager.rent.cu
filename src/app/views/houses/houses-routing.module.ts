import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HousesListComponent } from './houses-list/houses-list.component';
import { HousesAddEditComponent } from './houses-add-edit/houses-add-edit.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full',
  },
  {
    path: 'list',
    component: HousesListComponent,
    data: {
      title: 'Houses\' List'
    }
  },
  {
    path: 'new',
    component: HousesAddEditComponent,
    data: {
      title: 'New House'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HousesRoutingModule {
}
