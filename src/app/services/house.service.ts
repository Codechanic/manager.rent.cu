import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { House } from '../model/house.model';
import { environment } from '../../environments/environment';

/**
 * House handling service
 */
@Injectable({
  providedIn: 'root',
})
export class HouseService {

  /**
   * Service constructor
   * @param httpClient The Angular HttpClient service
   */
  constructor(private httpClient: HttpClient) {
  }

  /**
   * Find all houses
   */
  find(): Observable<House[]> {
    return this.httpClient.get<House[]>(environment.uris.api + '/house/');
  }

  /**
   * Find house by id
   * @param id House id
   */
  findById(id: string): Observable<House> {
    return this.httpClient.get<House>(environment.uris.api + '/house/' + id);
  }

  /**
   * Find house by it's manager id
   * @param managerId House manager id
   */
  findByManagerId(managerId: string): Observable<House[]> {
    return this.httpClient.get<House[]>(environment.uris.api + '/house/manager/' + managerId);
  }

  /**
   * Create a house
   * @param house House to be created
   */
  create(house: House) {
    return this.httpClient.post<House>(environment.uris.api + '/house/create', house, {})
      .pipe(
        catchError(this.handleError),
      );
  }

  /**
   * Update house
   * @param house House to be updated
   */
  update(house: House) {
    return this.httpClient.put(environment.uris.api + '/house/' + house.id + '/update', house, {})
      .pipe(
        catchError(this.handleError),
      );
  }

  /**
   * Delete a house
   * @param id Id of the house to be deleted
   */
  delete(id: string) {
    return this.httpClient.delete(environment.uris.api + '/house/' + id + '/delete');
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
