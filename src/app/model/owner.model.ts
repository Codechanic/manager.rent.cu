import { House } from './house.model';

export class Owner {
  id: string;
  name: string;
  lastName: string;
  email: string;
  houses: House[];
}
