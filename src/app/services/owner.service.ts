import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Owner } from '../model/owner.model';

/**
 * Manager handling service
 */
@Injectable({
  providedIn: 'root',
})
export class OwnerService {

  /**
   * Service constructor
   * @param httpClient The Angular HttpClient service
   */
  constructor(private httpClient: HttpClient) {
  }

  /**
   * Find owner by id
   * @param id Manager id
   */
  findById(id): Observable<Owner> {
    return this.httpClient.get<Owner>(environment.uris.api + '/user/' + id);
  }
}
