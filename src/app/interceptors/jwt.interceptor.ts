import { Injectable } from "@angular/core";
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from "@angular/common/http";

import { Observable } from "rxjs";
import { catchError, switchMap } from "rxjs/operators";
import { CookieService } from "ngx-cookie-service";
import * as CryptoJS from "crypto-js"
  ;
import { environment } from "environments/environment";
import { AuthService } from "../services/auth.service";

/**
 * Http requests interceptor
 * @description Allows to inject jwt to every outgoing http request
 */
@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private cookieService: CookieService, private authService: AuthService) {
  }

  /**
   * Intercepts http request
   * @param request Request intercepted
   * @param next Next step in the chain to execute
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (!request.url.includes(environment.uris.refresh_token)) {
      request = this.setRequestJWTToken(request);
    }

    return next.handle(request).pipe(
      catchError((error, caught) => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          return this.authService.refreshToken().pipe(switchMap((response) => {
            this.cookieService.set("context", CryptoJS.AES.encrypt(response, environment.secret).toString());
            return next.handle(this.setRequestJWTToken(request));
          }));
        }
      })
    );
  }


  /**
   * Gets the JWT string from the cookie.
   * @description This function returns empty in case no JWT is found
   */
  public getJwt(): string {
    return this.cookieService.get("context");
  }

  /**
   * Sets the JWT Token in the request
   * @param request
   */
  private setRequestJWTToken(request: HttpRequest<any>) {

    /* add authorization header with jwt token if available */
    let jwt = this.getJwt();

    /* the jwt is in a cookie and it is encrypted*/
    if (jwt) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${CryptoJS.AES.decrypt(jwt, environment.secret).toString(CryptoJS.enc.Utf8)}`
        }
      });
    }

    return request;
  }
}
