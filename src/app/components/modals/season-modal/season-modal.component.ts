import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

import { ModalDirective } from 'ngx-bootstrap';

@Component({
  selector: 'app-season-modal',
  templateUrl: './season-modal.component.html',
  styleUrls: ['./season-modal.component.scss'],
})
export class SeasonModalComponent implements OnInit {

  /**
   * Instance reference to ngx-bootstrap modal
   */
  @ViewChild('seasonModal', { static: false }) public seasonModal: ModalDirective;

  /**
   * Event to emit when the operation was confirmed
   */
  @Output() actionConfirmed = new EventEmitter<boolean>();

  seasonForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.seasonForm = this.fb.group({
      name: this.fb.control(''),
      seasonRanges: this.fb.array([]),
    });
  }

  ngOnInit() {
    this.addSeasonRange({ start: Date.now(), end: Date.now() });
  }

  onCreate() {

    /* emit event that confirms the operation */
    this.actionConfirmed.emit(true);

    /* hide the modal */
    this.seasonModal.hide();
  }

  addSeasonRange(seasonRange) {
    const seasonRangesControl = <FormArray> this.seasonForm.controls['seasonRanges'];
    seasonRangesControl.push(this.fb.group({
      start: seasonRange.start,
      end: seasonRange.end,
    }));
  }
}
