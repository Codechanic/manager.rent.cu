import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from '@angular/common';

import { AlertModule, TabsModule } from "ngx-bootstrap";
import { NgxSpinnerModule } from "ngx-spinner";

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';


@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TabsModule,
    ProfileRoutingModule,
    NgxSpinnerModule,
    AlertModule
  ]
})
export class ProfileModule { }
