import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Manager } from '../model/manager.model';

/**
 * Manager handling service
 */
@Injectable({
  providedIn: 'root',
})
export class ManagerService {

  /**
   * Service constructor
   * @param httpClient The Angular HttpClient service
   */
  constructor(private httpClient: HttpClient) {
  }

  /**
   * Find manager by id
   * @param id Manager id
   */
  findById(id): Observable<Manager> {
    return this.httpClient.get<Manager>(environment.uris.api + '/manager/' + id);
  }
}
