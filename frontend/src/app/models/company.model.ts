import { Adress } from './adress.model';
import { Bank } from './bank.model';

export interface Company {
  _id?: string;
  companyName?: string;
  adress?: Adress;
  euid?: string;
  registrationNumber?: string;
  website?: string;
  logo?: string;
  phone?: string;
  fax?: string;
  mobile?: string;
  email?: string;
  caen?: string;
  bank?: Bank[];
}
