import { Adress } from './adress.model';
import { Bank } from './bank.model';
import { Company } from './company.model';
import { Item } from './item.model';

export interface Invoice {
  _id?: string;
  Invoice: {
    InvoiceTypeCode: number;
    ID: string;
    IssueDate: Date;
    InvoicePeriod: {
      StartDate: Date;
      EndDate: Date;
    };
    Note: [string, string];
    DocumentCurrencyCode: string;
    BuyerReference?: string;
    OrderReference?: { ID: string };
    ContractDocumentReference?: { ID: string; DocumentType: string };
    AccountingSupplierParty: Company['Party'];
    AccountingCustomerParty: Company['Party'];
    Delivery: {
      ActualDeliveryDate: Date;
      DeliveryLocation: {
        Adress: Adress;
      };
    };
    PaymentMeans: {
      PaymentCode: number;
      PaymentID: string;
      PayeeFinancialAccount: Bank;
    };
    TaxTotal: {
      TaxAmout: number;
      ApplyedTaxes: [
        {
          TaxSubtotal: {
            TaxableAmount: number;
            TaxCategory: {
              ID: string;
              Percent: number;
              TaxScheme: {
                ID: string;
              };
            };
          };
        }
      ];
    };
    LegalMonetaryTotal: {
      TaxExclusiveAmount: number;
      TaxInclusiveAmount: number;
      LineExtensionAmount: number;
      PayableAmount: number;
    };
    Lines: {
      InvoiceLine:{
      ID: number;
      InvoicedQuantity: number;
      LineExtensionAmount: number;
      Item: Item['Item'];
      Price: Item['Price'];
    }}[];
  };
}
