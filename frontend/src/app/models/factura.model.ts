import { Adresa } from './adresa.model';

export interface Factura {
  _id?: string;
  clientdata: {
    nume: string;
    adresa: Adresa;
    telefon: string;
    cui: string;
    email: string;
  };
  dueDate: string;
  tva: string;
  currency: string;
  totalInvoice: string;
  dateNow: Date;
  nrFactura: string;
  tabel: string;
}
