import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ModalModule } from 'ngx-bootstrap';

import { DeleteComponent } from './delete/delete.component';
import { SeasonModalComponent } from './season-modal/season-modal.component';

@NgModule({
  declarations: [DeleteComponent, SeasonModalComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ModalModule.forRoot()
  ],
  exports: [DeleteComponent, SeasonModalComponent],
})
export class ModalsModule { }
