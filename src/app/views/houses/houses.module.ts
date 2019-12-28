import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AlertModule, BsDropdownModule } from "ngx-bootstrap";
import { ReactiveFormsModule } from "@angular/forms";
import { NgxPaginationModule } from "ngx-pagination";

import { HousesRoutingModule } from "./houses-routing.module";
import { HousesListComponent } from "./houses-list/houses-list.component";
import { HousesAddEditComponent } from "./houses-add-edit/houses-add-edit.component";
import { ModalsModule } from "../modals/modals.module";
import { CommentsListComponent } from "./comments-list/comments-list.component";
import { OwnerCardComponent } from "./owner-card/owner-card.component";
import { HouseCardComponent } from './house-card/house-card.component';

@NgModule({
  declarations: [HousesListComponent, HousesAddEditComponent, CommentsListComponent, OwnerCardComponent, HouseCardComponent],
  imports: [
    CommonModule,
    HousesRoutingModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    ModalsModule,
    BsDropdownModule.forRoot(),
    AlertModule.forRoot()
  ]
})
export class HousesModule {
}
