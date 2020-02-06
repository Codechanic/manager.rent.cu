import { Owner } from './owner.model';
import { Municipality } from './municipality.model';
import { AccommodationType } from './accommodation-type.model';
import { FreeService } from './free-service.model';
import { NotOffered } from './not-offered.model';
import { ExtraCostService } from './extra-cost-service.model';
import { Place } from './place.model';
import {HouseSeasonPrice} from './house-season-price.model';


export class House {
  id: string;
  name: string;
  address: string;
  phones: string;
  rooms: number;
  description: string;
  owner: Owner;
  municipality: Municipality;
  path: string;
  latitude: number;
  longitude: number;
  metaKeywords: string;
  accommodation: AccommodationType;
  homestayFreeservices: FreeService[];
  homestayNotOffered: NotOffered[];
  homestayExtracosts: ExtraCostService[];
  homestayPrices: HouseSeasonPrice[];
  places: Place[];
}
