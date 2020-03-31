import { Component, OnInit } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";

import { NgxSpinnerService } from "ngx-spinner";

import { AppCommonConstants } from "../../constants/common";
import { AuthService } from "../../services/auth.service";
import { User } from "../../model/user.model";
import { UserService } from "../../services/user.service";

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
   * Object to handle alerts
   */
  alert = { type: "", msg: "", show: false };

  /**
   * Component constructor
   */
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private spinnerService: NgxSpinnerService) {

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
    const loggedUser = this.authService.currentUser();
    const user: User = {
      id: loggedUser.id,
      email: this.personalDataForm.get("email").value,
      name: this.personalDataForm.get("name").value,
      username: this.personalDataForm.get("name").value,
      enabled: true
    };

    this.spinnerService.show();
    this.userService.update(user).subscribe(
      (result) => {
        this.spinnerService.hide();
        this.showAlertMessage(
          AppCommonConstants.ALERT_MESSAGE_TYPES.SUCCESS,
          AppCommonConstants.ALERT_MESSAGES.SUCCESS.USER_CHANGED
        );
      },
      (error) => {
        this.spinnerService.hide();
        this.showAlertMessage(
          AppCommonConstants.ALERT_MESSAGE_TYPES.DANGER,
          error
        );
      }
    );
  }

  /**
   * On change password form submit
   */
  onChangePasswordFormSubmit() {
    console.log(this.changePasswordForm.controls["old"].value, this.changePasswordForm.controls["passwords"].get("new").value);
    this.spinnerService.show();
    this.authService.password(this.changePasswordForm.controls["old"].value, this.changePasswordForm.controls["passwords"].get("new").value).subscribe(
      (result) => {
        this.spinnerService.hide();

        this.showAlertMessage(
          AppCommonConstants.ALERT_MESSAGE_TYPES.SUCCESS,
          AppCommonConstants.ALERT_MESSAGES.SUCCESS.PASSWORD_CHANGED
        );

        console.log(result);
      },
      (error) => {
        this.spinnerService.hide();
        this.showAlertMessage(
          AppCommonConstants.ALERT_MESSAGE_TYPES.DANGER,
          error
        );
      }
    );
  }

  /**
   * Utility function to show alerts
   * @param type Alert type
   * @param message Alert message
   */
  showAlertMessage(type: string, message: string) {
    this.alert.type = type;
    this.alert.msg = message;
    this.alert.show = true;

  }
}
