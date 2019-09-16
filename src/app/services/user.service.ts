import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';

import { environment } from '../../environments/environment';
import { User } from '../model/user.model';
import { catchError } from 'rxjs/operators';

/**
 * User handling service
 */
@Injectable({
  providedIn: 'root'
})
export class UserService {

  /**
   * Service constructor
   * @param httpClient The Angular HttpClient service
   */
  constructor(private httpClient: HttpClient) {
  }

  /**
   * Find all users
   */
  find(): Observable<User[]> {
    return this.httpClient.get<any[]>(environment.uris.api + '/user');
  }

  /**
   * Create a user
   * @param user House to be created
   */
  create(user: User) {
    return this.httpClient.post<User>(environment.uris.api + '/user/create', user, {})
      .pipe(
        catchError(this.handleError),
      );
  }

  /**
   * Handle http requests errors
   * @param error Http request error
   */
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }
}
