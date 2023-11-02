import { Company } from './company.model';

export interface User {
  email: string;
  password: string;
  role: string;
  company: Company;
  preferedCurrency?: string;
  preferedLanguage?: string;
  preferedInvoiceText: string;
  footNotes?: string;
  preferedDuePeriod?: string;
  preferedVat?: string;
  articles?: [{ name: string; price: string; unit: string }];
  nextInvoiceNr?: string;
}
