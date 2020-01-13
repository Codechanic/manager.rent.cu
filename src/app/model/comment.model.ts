import { House } from "./house.model";

export class Comment {
  id: string;
  name: string;
  email: string;
  nick: string;
  text: string;
  rating: number;
  enabled: boolean;
  homestay: House;
}
