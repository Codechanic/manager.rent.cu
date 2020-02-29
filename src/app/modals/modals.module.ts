import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

import { BsDatepickerModule, ModalModule } from "ngx-bootstrap";

import { DeleteComponent } from "./delete/delete.component";
import { SeasonModalComponent } from "./season-modal/season-modal.component";
import { HousePreviewComponent } from "./house-preview/house-preview.component";
import { ConfirmComponent } from "./confirm/confirm.component";

@NgModule({
  declarations: [
    DeleteComponent,
    SeasonModalComponent,
    HousePreviewComponent,
    ConfirmComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot()
  ],
  entryComponents: [
    SeasonModalComponent,
    HousePreviewComponent,
    ConfirmComponent
  ],
  exports: [
    DeleteComponent,
    SeasonModalComponent,
    HousePreviewComponent,
    ConfirmComponent
  ]
})
export class ModalsModule {
}
