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

  uploadImage(houseId: string, images: File[], straightBinary = false): Observable<any> {
    const formData = new FormData();
    for (let i = 0; i < images.length; i++) {
      formData.append('vibalco_gallerybundle_multiple_imagetype[images][' + i + ']', images[i]);
      console.log(formData.get('vibalco_gallerybundle_multiple_imagetype[images]'), images[i]);
    }

    if (!straightBinary) {
      return this.httpClient.post(`${environment.uris.upload}/${houseId}/upload`, formData);
    } else {
      return this.httpClient.post(`${environment.uris.upload}/${houseId}/upload`, images);
    }
  }

}
