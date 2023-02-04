import { Adresa } from './adresa.model';
export interface Person {
  _id: string;
  nume: string;
  adresa: Adresa;
  telefon: string;
  email: string;
}
