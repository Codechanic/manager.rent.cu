import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';

import {Image} from '../model/image';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private httpClient: HttpClient) {
  }

  findByOwner(ownerId: string): Observable<Image[]> {
    return this.httpClient.get<Image[]>(environment.uris.api + '/images/owner/' + ownerId);
  }

  uploadImage(houseId: string, image: File, straightBinary = false): Observable<any> {
    const formData = new FormData();
    formData.append('vibalco_gallerybundle_imagetype[image]', image);
    console.log(formData.get('vibalco_gallerybundle_imagetype[image]'), image);
    if (!straightBinary) {
      return this.httpClient.post(`${environment.uris.upload}/${houseId}/upload`, formData);
    } else {
      return this.httpClient.post(`${environment.uris.upload}/${houseId}/upload`, image);
    }
  }

}
