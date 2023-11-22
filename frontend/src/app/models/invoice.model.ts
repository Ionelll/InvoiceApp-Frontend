import { Adress } from './adress.model';
import { Bank } from './bank.model';
import { Company } from './company.model';
import { Item } from './item.model';
import { TaxSubtotal } from './tax-subtotal.model';

export interface Invoice {
  _id?: string;
  Invoice: {
    InvoiceTypeCode: string;
    ID: string;
    IssueDate: string;
    InvoicePeriod: {
      StartDate: string;
      EndDate: string;
    };
    Note: [string, string];
    DocumentCurrencyCode: string;
    BuyerReference?: string;
    OrderReference?: { ID: string };
    ContractDocumentReference?: { ID: string; DocumentType: string };
    AccountingSupplierParty: Company;
    AccountingCustomerParty: Company;
    Delivery: {
      ActualDeliveryDate: string;
      DeliveryLocation: {
        Adress: Adress;
      };
    };
    PaymentMeans: {
      PaymentCode: string;
      PaymentID: string;
      PayeeFinancialAccount: Bank;
    };
    PaymentTerms: {
      Note: string;
    };
    TaxTotal: {
      TaxAmout: string;
      ApplyedTaxes: TaxSubtotal[];
    };
    LegalMonetaryTotal: {
      TaxExclusiveAmount: string;
      TaxInclusiveAmount: string;
      LineExtensionAmount: string;
      PayableAmount: string;
    };
    Lines: [
      {
        InvoiceLine: {
          ID: string; //array index
          InvoicedQuantity: string;
          LineExtensionAmount: string;
          Item: Item['Item'];
          Price: Item['Price'];
        };
      }
    ];
  };
}
