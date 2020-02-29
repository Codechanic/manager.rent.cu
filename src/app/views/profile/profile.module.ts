import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TabsModule } from "ngx-bootstrap";

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { ReactiveFormsModule } from "@angular/forms";


@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TabsModule,
    ProfileRoutingModule
  ]
})
export class ProfileModule { }
