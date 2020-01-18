import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalModule } from 'ngx-bootstrap';

import { DeleteComponent } from './delete/delete.component';

@NgModule({
  declarations: [DeleteComponent],
  imports: [
    CommonModule,
    ModalModule.forRoot()
  ],
  exports: [DeleteComponent]
})
export class ModalsModule { }
