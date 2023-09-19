import { Adress } from './adress.model';
export interface Person {
  id: string;
  name: string;
  adress: Adress;
  phone: string;
  email: string;
}
