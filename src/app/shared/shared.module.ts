import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { HouseCardComponent } from "./house-card/house-card.component";
import { OwnerCardComponent } from "./owner-card/owner-card.component";
import { ImageUploadComponent } from './image-upload/image-upload.component';
import { ReactiveFormsModule } from "@angular/forms";


@NgModule({
  declarations: [HouseCardComponent, OwnerCardComponent, ImageUploadComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    HouseCardComponent, OwnerCardComponent, ImageUploadComponent
  ]
})
export class SharedModule {
}
