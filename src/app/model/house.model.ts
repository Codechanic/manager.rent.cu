import { Manager } from './manager.model';

export class House {
  id: string;
  name: string;
  address: string;
  phones: string;
  rooms: number;
  description: string;
  manager: Manager;
}
