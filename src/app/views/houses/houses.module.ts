import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CollapseModule } from 'ngx-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';

import { HousesRoutingModule } from './houses-routing.module';
import { HousesListComponent } from './houses-list/houses-list.component';
import { HousesAddEditComponent } from './houses-add-edit/houses-add-edit.component';

@NgModule({
  declarations: [HousesListComponent, HousesAddEditComponent],
  imports: [
    CommonModule,
    HousesRoutingModule,
    NgSelectModule,
    CollapseModule.forRoot(),
  ]
})
export class HousesModule {
}
