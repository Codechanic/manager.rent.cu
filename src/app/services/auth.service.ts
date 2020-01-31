import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { CookieService } from "ngx-cookie-service";
import { Observable, Subscriber } from "rxjs";
import * as CryptoJS from "crypto-js";
import * as jwt_decode from "jwt-decode";

import { environment } from "../../environments/environment";

/**
 * Authentication service
 */
@Injectable({
  providedIn: "root"
})
export class AuthService {

  jwtDecoder = jwt_decode;

  /**
   * Service constructor
   * @param cookieService Instance of the CookieService to be able to set and ¡retrieve cookies with ease
   * @param httpClient Instance of the HttpClient Angular service
   */
  constructor(private cookieService: CookieService, private httpClient: HttpClient) {
  }

  /**
   * Determines whether the user is authenticated or not
   * @description This is done by checking for the existence of the jwt cookie
   */
  isAuthenticated(): boolean {
    const jwt = this.cookieService.get("context");
    return !!jwt;
  }

  /**
   * Logs a user in
   * @description This performs a simple http request to the server
   * @param username User's username
   * @param password User's password
   */
  login(username: string, password: string): Observable<any> {
    const formData = new FormData();
    formData.append("_username", username);
    formData.append("_password", password);
    return this.httpClient.post(environment.uris.login, formData);
  }

  /**
   * Logs a user out
   * @description This performs a simple http request to the server
   */
  logout(): Observable<boolean> {
    this.cookieService.delete("context");
    return new Observable<any>(
      (subscriber: Subscriber<any>) => {
        subscriber.next(true);
        subscriber.complete();
      }
    );
  }

  /**
   * Register a new user in the app
   * @description This performs a simple http request to the server
   * @param user User to be registered
   */
  register(user): Observable<any> {
    const formData = new FormData();
    formData.append("_name", user.name);
    formData.append("_username", user.username);
    formData.append("_password", user.password);
    return this.httpClient.post(environment.uris.register, formData);
  }

  /**
   * Determines if the jwt has expired
   */
  isTokenExpired(): boolean {

    /* gets and decrypts the jwt from the cookie */
    const jwt = CryptoJS.AES.decrypt(this.cookieService.get("context"), environment.secret).toString(CryptoJS.enc.Utf8);

    /* early return if there is no jwt */
    if (!jwt) {
      return;
    }

    /* decodes the kwt to get the expiration date */
    const jwt_decoded = this.jwtDecoder(jwt);

    /* if the exp property is not in the jwt, it's considered an invalid token and return true */
    if (jwt_decoded.exp === undefined) {
      return true;
    }

    const expirationDate = new Date(0);
    expirationDate.setUTCSeconds(jwt_decoded.exp);

    if (expirationDate === undefined) {
      return false;
    }
    return !(expirationDate.valueOf() > new Date().valueOf());
  }

  /**
   * Returns the currently logged in user
   */
  currentUser() {

    /* gets and decrypts the jwt from the cookie */
    const jwt = CryptoJS.AES.decrypt(
      this.cookieService.get("context"), environment.secret
    ).toString(CryptoJS.enc.Utf8);

    /* early return if there is no jwt */
    if (!jwt) {
      return;
    }

    /* decode the jwt */
    const jwt_decoded = this.jwtDecoder(jwt);
    console.log(jwt_decoded);

    return { id: jwt_decoded.sub, username: jwt_decoded.username, role: jwt_decoded.role };
  }

  /**
   * Returns the password encrypted 10 times using SHA512 algorithm
   * @param password Password to encrypt
   */
  encryptPassword(password: string): string {
    const encryptedPassword = CryptoJS.SHA512(password);
    return encryptedPassword.toString(CryptoJS.enc.Base64);
  }
}
