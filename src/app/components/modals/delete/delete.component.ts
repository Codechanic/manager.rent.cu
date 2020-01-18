import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
})
export class DeleteComponent {

  /**
   * Instance reference to ngx-bootstrap modal
   */
  @ViewChild('dangerModal', { static: false }) public dangerModal: ModalDirective;

  /**
   * Event to emit when the operation was confirmed
   */
  @Output() actionConfirmed = new EventEmitter<boolean>();

  /**
   * Function called on confirming deletion
   */
  onDelete() {

    /* emit event that confirms the operation */
    this.actionConfirmed.emit(true);

    /* hide the modal */
    this.dangerModal.hide();
  }
}
