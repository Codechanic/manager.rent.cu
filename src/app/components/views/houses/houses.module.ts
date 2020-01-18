import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AlertModule, BsDropdownModule, TabsModule } from "ngx-bootstrap";
import { ReactiveFormsModule } from "@angular/forms";
import { AgGridModule } from "ag-grid-angular";
import { NgSelectModule } from "@ng-select/ng-select";

import { HousesRoutingModule } from "./houses-routing.module";
import { HousesListComponent } from "./houses-list/houses-list.component";
import { HousesAddEditComponent } from "./houses-add-edit/houses-add-edit.component";
import { ModalsModule } from "../../modals/modals.module";
import { SharedModule } from "../../shared/shared.module";

@NgModule({
  declarations: [
    HousesListComponent,
    HousesAddEditComponent],
  imports: [
    CommonModule,
    HousesRoutingModule,
    ReactiveFormsModule,
    ModalsModule,
    TabsModule,
    NgSelectModule,
    SharedModule,
    BsDropdownModule.forRoot(),
    AlertModule.forRoot(),
    AgGridModule.withComponents([])
  ]
})
export class HousesModule {
}
