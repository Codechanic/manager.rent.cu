import { Component, EventEmitter, OnInit } from "@angular/core";
import { BsModalRef } from "ngx-bootstrap";

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {
  confirmMessage: string;

  onConfirmed: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private bsModalRef: BsModalRef) { }

  ngOnInit() {
  }

  onDecline() {
    this.onConfirmed.emit(false);
    this.bsModalRef.hide();
  }

  onConfirm() {
    this.onConfirmed.emit(true);
    this.bsModalRef.hide();
  }
}
