import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { HouseCardComponent } from "./house-card/house-card.component";
import { OwnerCardComponent } from "./owner-card/owner-card.component";


@NgModule({
  declarations: [HouseCardComponent, OwnerCardComponent],
  imports: [
    CommonModule
  ],
  exports: [
    HouseCardComponent, OwnerCardComponent
  ]
})
export class SharedModule {
}
