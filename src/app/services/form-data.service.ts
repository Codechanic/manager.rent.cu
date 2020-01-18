import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs";

import { Province } from "../model/province.model";
import { environment } from "../../environments/environment";
import { Municipality } from "../model/municipality.model";
import { AccommodationType } from "../model/accommodation-type.model";
import { FreeService } from "../model/free-service.model";
import { ExtraCostService } from "../model/extra-cost-service.model";
import { NotOffered } from "../model/not-offered.model";
import { Place } from "../model/place.model";

/**
 * Form data handling service
 */
@Injectable({
  providedIn: 'root'
})
export class FormDataService {

  /**
   * Service constructor
   */
  constructor(private httpClient: HttpClient) { }

  /**
   * Get list of provinces
   */
  provinces(): Observable<Province[]> {
    return this.httpClient.get<Province[]>(environment.uris.api + '/form/data/province');
  }

  /**
   * Get list of municipalites
   */
  municipalities(): Observable<Municipality[]> {
    return this.httpClient.get<Municipality[]>(environment.uris.api + '/form/data/municipality');
  }

  /**
   * Get list of accommodation types
   */
  accommodationTypes(): Observable<AccommodationType[]> {
    return this.httpClient.get<AccommodationType[]>(environment.uris.api + '/form/data/accommodation');
  }

  /**
   * Get list of free services
   */
  freeServices(): Observable<FreeService[]> {
    return this.httpClient.get<FreeService[]>(environment.uris.api + '/form/data/freeservice');
  }

  /**
   * Get list of not offered services
   */
  notOffered(): Observable<NotOffered[]> {
    return this.httpClient.get<FreeService[]>(environment.uris.api + '/form/data/notoffered');
  }

  /**
   * Get list of extra cost services
   */
  extraCost(): Observable<ExtraCostService[]> {
    return this.httpClient.get<ExtraCostService[]>(environment.uris.api + '/form/data/extracost');
  }

  /**
   * Get list of nearby places
   */
  places(): Observable<Place[]> {
    return this.httpClient.get<Place[]>(environment.uris.api + '/form/data/place');
  }
}
