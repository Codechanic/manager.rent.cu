import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';

import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import * as CryptoJS from 'crypto-js';
import { environment } from 'environments/environment';

/**
 * Http requests interceptor
 * @description Allows to inject jwt to every outgoing http request
 */
@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private cookieService: CookieService) {
  }

  /**
   * Intercepts http request
   * @param request Request intercepted
   * @param next Next step in the chain to execute
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    /* add authorization header with jwt token if available */
    const jwt = this.getJwt();

    /* the jwt is in a cookie and it is encrypted*/
    if (jwt) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${CryptoJS.AES.decrypt(jwt, environment.secret).toString(CryptoJS.enc.Utf8)}`
        }
      });
    }

    return next.handle(request);
  }


  /**
   * Gets the JWT string from the cookie.
   * @description This function returns empty in case no JWT is found
   */
  public getJwt(): string {
    return this.cookieService.get('context');
  }
}
