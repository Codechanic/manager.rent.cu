import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AlertModule, BsDropdownModule, TabsModule } from 'ngx-bootstrap';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import { NgxCheckboxModule } from "ngx-checkbox";

import { CommentsRoutingModule } from './comments-routing.module';
import { CommentsListComponent } from './comments-list/comments-list.component';
import { CommentsAddEditComponent } from './comments-add-edit/comments-add-edit.component';
import { SharedModule } from '../../shared/shared.module';
import { ModalsModule } from '../../modals/modals.module';

@NgModule({
  declarations: [
    CommentsListComponent,
    CommentsAddEditComponent
  ],
  imports: [
    SharedModule,
    ModalsModule,
    CommonModule,
    CommentsRoutingModule,
    ReactiveFormsModule,
    TabsModule,
    NgxDatatableModule,
    NgxCheckboxModule,
    BsDropdownModule.forRoot(),
    AlertModule.forRoot(),
  ]
})
export class CommentsModule {
}
