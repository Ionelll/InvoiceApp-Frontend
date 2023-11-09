import { Company } from './company.model';
import { Item } from './item.model';
import { Bank } from './bank.model';

export interface User {
  email: string;
  password: string;
  role: string;
  company: Company;
  PayeeFinancialAccount?: Bank;
  preferedCurrency?: string;
  preferedLanguage?: string;
  preferedInvoiceText: string;
  footNotes?: string;
  preferedDuePeriod?: string;
  preferedVat?: string;
  item?: Item[];
  lastInvoiceNr?: string;
  logo?: any;
}
