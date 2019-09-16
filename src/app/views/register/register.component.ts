import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { CookieService } from 'ngx-cookie-service';
import * as CryptoJS from 'crypto-js';

import { AuthService } from '../../services/auth.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'register.component.html',
})
export class RegisterComponent {

  /**
   * Form group to hold and validate User and Manager data
   */
  registerForm: FormGroup;

  /**
   * Component's constructor
   * @param formBuilder Angular's form building service
   * @param authService Authentication service
   * @param cookieService Cookie handling service
   * @param router Angular's router service
   */
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private cookieService: CookieService,
    private router: Router) {

    /* initialize registration form */
    this.registerForm = this.formBuilder.group({
      username: [null, Validators.required],
      password: [null, Validators.required],
      repeat_password: [null, Validators.required],
      name: [null, Validators.required],
      lastName: [null, Validators.required],
      email: [null, Validators.compose([Validators.required, Validators.email])],

    }, {
      validators: this.checkPasswords,
    });
  }

  /**
   * Function called on form submitting
   */
  onSubmit() {

    /* if registration form data is valid */
    if (this.registerForm.valid) {

      /* call service action that initializes registration operation */
      this.authService.register(this.registerForm.value).subscribe((response: { access_token }) => {

        /* if registration succeeded, store the jwt result in cookie (registration ends up in authentication) */
        this.cookieService.set('context', CryptoJS.AES.encrypt(response.access_token, environment.secret).toString());

        /* navigate to houses route */
        this.router.navigate(['/houses']);
      });
    }
  }

  /**
   * Custom form validator
   * @param control Form control holding data
   */
  checkPasswords(control: AbstractControl) {

    /* early return if password field is not found */
    if (!control.get('password')) {
      return null;
    }

    /* get the password and its confirmation */
    const password = control.get('password').value;
    const repeat_password = control.get('repeat_password').value;

    /* return an error if passwords don't match */
    return password === repeat_password ? null : { notSame: true };
  }
}
