import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs";

import {Comment} from "../model/comment.model";
import { environment } from "../../environments/environment";

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
  constructor(private httpClient: HttpClient) { }

  /**
   * Find comments by house
   * @param houseId Id of the associated house
   */
  findByHouse(houseId: string): Observable<Comment[]> {
    return this.httpClient.get<Comment[]>(environment.uris.api + '/comment/house/' + houseId);
  }
}
