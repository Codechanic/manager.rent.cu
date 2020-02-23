import { Component, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";

import { BsModalRef } from "ngx-bootstrap";

@Component({
  selector: "app-season-modal",
  templateUrl: "./season-modal.component.html",
  styleUrls: ["./season-modal.component.scss"]
})
export class SeasonModalComponent implements OnInit {

  /**
   * Form group for manipulating seasons
   */
  seasonForm: FormGroup;

  confirmed = false;

  constructor(
    private fb: FormBuilder,
    public bsModalRef: BsModalRef) {
    this.seasonForm = this.fb.group({
      name: this.fb.control("", Validators.required),
      seasonRanges: this.fb.array([])
    });
  }

  ngOnInit() {
    this.addSeasonRange();
  }

  onConfirm() {
    if (this.seasonForm.valid) {
      this.confirmed = true;
      this.bsModalRef.hide();
    } else {
      this.seasonForm.markAllAsTouched();
    }
  }

  onCancel() {
    this.confirmed = false;
    this.bsModalRef.hide();
  }

  addSeasonRange() {
    const start = new Date();
    const end = new Date();
    end.setDate(end.getDate() + 31);

    const seasonRangesControl = <FormArray>this.seasonForm.controls["seasonRanges"];
    seasonRangesControl.push(this.fb.group({
      range: this.fb.control([start, end], Validators.required)
    }));
  }

  deleteSeasonRangeAtIndex(index: number) {
    const seasonRangesControl = <FormArray>this.seasonForm.controls["seasonRanges"];
    seasonRangesControl.removeAt(index);
  }
}
