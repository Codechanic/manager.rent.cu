import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import * as CryptoJS from 'crypto-js';
import { CookieService } from 'ngx-cookie-service';
import * as jwt_decode from 'jwt-decode';

import { AuthService } from '../../services/auth.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html',
})
export class LoginComponent implements OnInit {

  /**
   * Property that says if the component was accessed because the session expired
   */
  sessionExpired: false;

  /**
   * Form group to collect and validate user data for authentication
   */
  loginForm = new FormGroup(
    {
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    },
  );
  private loginError = { show: false, message: '' };

  /**
   * Component's constructor
   * @param authService Authentication service
   * @param cookieService Cookie handling service
   * @param router Angular's Router service
   * @param activatedRoute Activated route
   */
  constructor(
    private authService: AuthService,
    private cookieService: CookieService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
  }

  /**
   * Lifecycle hook to component's initialization
   */
  ngOnInit(): void {

    /* get whether the session expired or not from route param */
    this.sessionExpired = this.activatedRoute.snapshot.params['expired'] !== undefined
      ? this.activatedRoute.snapshot.params['expired']
      : false;
  }

  /**
   * Function called on submitting login form
   */
  onSubmit() {

    /* if form data is valid */
    if (this.loginForm.valid) {

      /*
      * get credentials from form and pass them as params to the service action
      * that initializes authentication process
      */
      const credentials = this.loginForm.value;
      this.authService.login(credentials.username, credentials.password)
        .subscribe((response: { access_token }) => {

          /* if the authentication succeeded, store the resulting jwt in cookie encrypted  */
          this.cookieService.set('context', CryptoJS.AES.encrypt(response.access_token, environment.secret).toString());

          /* navigate to the houses route */
          this.router.navigate(['/houses']);
        }, error => {
          this.loginError.show = true;
          this.loginError.message = 'Login failed';
        });
    }
  }
}
