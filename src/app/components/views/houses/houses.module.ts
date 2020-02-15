import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AlertModule, BsDropdownModule, TabsModule } from 'ngx-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { HousesRoutingModule } from './houses-routing.module';
import { HousesListComponent } from './houses-list/houses-list.component';
import { HousesAddEditComponent } from './houses-add-edit/houses-add-edit.component';
import { ModalsModule } from '../../modals/modals.module';
import { SharedModule } from '../../shared/shared.module';
import { FormControlDateSortPipe } from '../../../pipes/form-control-date-sort.pipe';
import { SeasonScrubPipe } from "../../../pipes/season-scrub.pipe";

@NgModule({
  declarations: [
    HousesListComponent,
    HousesAddEditComponent,
    FormControlDateSortPipe,
    SeasonScrubPipe
  ],
  imports: [
    CommonModule,
    HousesRoutingModule,
    ReactiveFormsModule,
    ModalsModule,
    TabsModule,
    NgSelectModule,
    SharedModule,
    NgxDatatableModule,
    BsDropdownModule.forRoot(),
    AlertModule.forRoot(),
  ]
})
export class HousesModule {
}