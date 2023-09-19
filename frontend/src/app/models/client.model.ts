import { Adress } from './adress.model';

export interface Client {
  _id?: string;
  companyName?: string;
  adress?: Adress;
  euid?: string;
  registrationNumber?: string;
  phone?: string;
  mobile?: string;
  email?: string;
}
