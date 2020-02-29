import { Component, OnInit } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";

import { AppCommonConstants } from "../../constants/common";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"]
})
export class ProfileComponent implements OnInit {

  /**
   * Possible pill values
   */
  profilePills = AppCommonConstants.PROFILE_PILLS;

  /**
   * Selected pill value
   */
  selectedPill = this.profilePills.PERSONAL_DATA;

  /**
   * Personal data form
   */
  personalDataForm: FormGroup;

  /**
   * Change password form
   */
  changePasswordForm: FormGroup;

  /**
   * Component constructor
   */
  constructor(private formBuilder: FormBuilder) {
    this.personalDataForm = this.formBuilder.group(
      {
        id: this.formBuilder.control(""),
        name: this.formBuilder.control(""),
        email: this.formBuilder.control("", Validators.email)
      }
    );

    this.changePasswordForm = this.formBuilder.group(
      {
        id: this.formBuilder.control(""),
        old: this.formBuilder.control(""),
        passwords: this.formBuilder.group({
          new: this.formBuilder.control(""),
          repeat: this.formBuilder.control("")
        }, { validators: this.passwordConfirming })
      }
    );
  }

  /**
   * Component's OnInit lifecycle
   */
  ngOnInit() {
  }

  passwordConfirming(control: AbstractControl): { invalid: boolean } {
    if (control.get("new").value !== control.get("repeat").value) {
      return { invalid: true };
    }
  }

  /**
   * On tab select event handler
   * @param $event Event's data
   */
  onTabSelect($event) {
    this.selectedPill = $event.heading;
  }

  /**
   * On personal data form submit event handler
   */
  onPersonalDataFormSubmit() {
    // call the service to update user's personal data
  }

  /**
   * On change password form submit
   */
  onChangePasswordFormSubmit() {
    // call the service to update the user's password
  }
}
