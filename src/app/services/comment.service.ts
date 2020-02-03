import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

import {Observable, throwError} from 'rxjs';

import {Comment} from '../model/comment.model';
import {environment} from '../../environments/environment';
import {catchError} from 'rxjs/operators';
import {Page} from '../model/page';

/**
 * Comments handling service
 */
@Injectable({
  providedIn: 'root'
})
export class CommentService {

  /**
   * Service constructor
   * @param httpClient The Angular HttpClient service
   */
  constructor(private httpClient: HttpClient) {
  }

  /**
   * Find comments by house
   * @param page Currently displayed page
   * @param houseId Id of the associated house
   */
  findByHouse(page: Page, houseId: string): Observable<Comment[]> {
    return this.httpClient.get<Comment[]>(
      environment.uris.api + '/comment/house/' + houseId + `?take=${page.size}&skip=${page.pageNumber * page.size}`
    );
  }

  /**
   * Find comment by id
   * @param id Id of the comment
   */
  findById(id: string): Observable<Comment> {
    return this.httpClient.get<Comment>(environment.uris.api + '/comment/' + id);
  }

  /**
   * Count all comments
   */
  count(): Observable<number> {
    return this.httpClient.get<number>(environment.uris.api + '/comment/count');
  }

  /**
   * Create a comment
   * @param comment Comment to be created
   */
  create(comment: Comment) {
    return this.httpClient.post<Comment>(environment.uris.api + '/comment/create', comment, {})
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Update comment
   * @param comment Comment to be updated
   */
  update(comment: Comment) {
    return this.httpClient.put(environment.uris.api + '/comment/' + comment.id, comment, {})
      .pipe(
        catchError(this.handleError)
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
