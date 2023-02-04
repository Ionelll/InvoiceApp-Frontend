import { Adresa } from './adresa.model';

export interface Company {
  _id?: string;
  name: string;
  adresa: Adresa;
  euid?: string;
  registrationNumber: string;
  web?: string;
  logo?: string;
  articles?: { nume: string; price: string; units: string }[];
  phone: string;
  mobile?: string;
  fax?: string;
  email: string;
  caen?: string;
  bank?: { name: string; iban: string; bic: string }[];
  invoices?: { _id: string };

  //  bank:string[]
}
