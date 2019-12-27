import { Owner } from './owner.model';

export class User {
  id: string;
  username: string;
  manager: Owner;
}
