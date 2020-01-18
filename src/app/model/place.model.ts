import { Municipality } from "./municipality.model";

export class Place {
  id: string;
  name: string;
  description: string;
  path: string;
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
  latitude: string;
  longitude: string;
  enabled: boolean;
  municipality: Municipality;
  address: string;
  phones: string;
}
