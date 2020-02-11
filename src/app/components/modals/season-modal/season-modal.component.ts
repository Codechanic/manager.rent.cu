import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

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

  /**
   * Form group for manipulating seasons
   */
  seasonForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.seasonForm = this.fb.group({
      name: this.fb.control('', Validators.required),
      seasonRanges: this.fb.array([]),
    });
  }

  ngOnInit() {
    this.addSeasonRange();
  }

  onCreate() {

    /* emit event that confirms the operation */
    this.actionConfirmed.emit(this.seasonForm.value);

    /* hide the modal */
    this.seasonModal.hide();
  }

  addSeasonRange() {
    const start = new Date();
    const end = new Date();
    end.setDate(end.getDate() + 31);

    const seasonRangesControl = <FormArray> this.seasonForm.controls['seasonRanges'];
    seasonRangesControl.push(this.fb.group({
      range: this.fb.control([start, end], Validators.required),
    }));
  }

  deleteSeasonRangeAtIndex(index: number) {
    const seasonRangesControl = <FormArray> this.seasonForm.controls['seasonRanges'];
    seasonRangesControl.removeAt(index);
  }
}
