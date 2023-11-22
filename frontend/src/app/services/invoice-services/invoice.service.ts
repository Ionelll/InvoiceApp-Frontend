import { Injectable } from '@angular/core';
import { Invoice } from 'src/app/models/invoice.model';
import { BehaviorSubject, Subject } from 'rxjs';
import { TaxSubtotal } from 'src/app/models/tax-subtotal.model';

@Injectable({ providedIn: 'root' })
export class InvoiceService {
  public invoice = new BehaviorSubject<Invoice>({
    Invoice: {
      InvoiceTypeCode: '',
      ID: '',
      IssueDate: '',
      InvoicePeriod: {
        StartDate: '',
        EndDate: '',
      },
      Note: ['', ''],
      DocumentCurrencyCode: '',
      BuyerReference: '',
      OrderReference: { ID: '' },
      ContractDocumentReference: { ID: '', DocumentType: '' },
      PaymentTerms: {
        Note: '',
      },
      AccountingSupplierParty: {
        Party: {
          EndpointID: '',
          IndustryClassificationCode: '',
          PartyIdentification: { ID: '' },
          PartyName: { Name: '' },
          PostalAdress: {
            Postbox: '',
            StreetName: '',
            BuildingNumber: '',
            CityName: '',
            PostalZone: '',
            CountrySubentity: '',
            Country: { IdentificationCode: '' },
          },
          Contact: {
            Name: '',
            Telephone: '',
            ElectronicMail: '',
          },
          BuyerReference: '',
        },
      },
      AccountingCustomerParty: {
        Party: {
          EndpointID: '',
          IndustryClassificationCode: '',
          PartyIdentification: { ID: '' },
          PartyName: { Name: '' },
          PostalAdress: {
            Postbox: '',
            StreetName: '',
            BuildingNumber: '',
            CityName: '',
            PostalZone: '',
            CountrySubentity: '',
            Country: { IdentificationCode: '' },
          },
          Contact: {
            Name: '',
            Telephone: '',
            ElectronicMail: '',
          },
          BuyerReference: '',
        },
      },
      Delivery: {
        ActualDeliveryDate: '',
        DeliveryLocation: {
          Adress: {
            Postbox: '',
            StreetName: '',
            BuildingNumber: '',
            CityName: '',
            PostalZone: '',
            CountrySubentity: '',
            Country: { IdentificationCode: '' },
          },
        },
      },
      PaymentMeans: {
        PaymentCode: '',
        PaymentID: '',
        PayeeFinancialAccount: {
          ID: '',
          CurrencyCode: '',
          FinancialInstitution: {
            Name: '',
            ID: '',
          },
        },
      },
      TaxTotal: {
        TaxAmout: '',
        ApplyedTaxes: [
          {
            TaxSubtotal: {
              TaxableAmount: '',
              TaxCategory: {
                ID: '',
                Percent: '',
                TaxScheme: {
                  ID: '',
                },
              },
            },
          },
        ],
      },
      LegalMonetaryTotal: {
        TaxExclusiveAmount: '',
        TaxInclusiveAmount: '',
        LineExtensionAmount: '',
        PayableAmount: '',
      },
      Lines: [
        {
          InvoiceLine: {
            ID: '', //array index
            InvoicedQuantity: '',
            LineExtensionAmount: '',
            Item: {
              Name: '',
              ClassifiedTaxCategory: {
                ID: '',
                Percent: '',
                TaxScheme: {
                  ID: '',
                },
              },
            },
            Price: {
              PriceAmount: '',
              BaseQuantity: '',
              UnitCode: '',
            },
          },
        },
      ],
    },
  });

  setTaxSubtotal(tax: string, taxList: TaxSubtotal[]) {
    let preInvoice = this.invoice.value;
    preInvoice.Invoice.TaxTotal.TaxAmout = tax;
    preInvoice.Invoice.TaxTotal.ApplyedTaxes = taxList;
    this.invoice.next(preInvoice);
    console.log(this.invoice.value);
  }
  set_ID_IssueDate(values: { ID: string; IssueDate: string }) {
    let preInvoice = this.invoice.value;
    preInvoice.Invoice.ID = values.ID;
    preInvoice.Invoice.IssueDate = values.IssueDate;
    this.invoice.next(preInvoice);
  }
  set_Details(values: {
    InvoicePeriod: { StartDate: string; EndDate: string };
    InvoiceTypeCode: string;
    DocumentCurrencyCode: string;
    Note: string;
    ContractReference: string;
    OrderReference: string;
    PaymentTerms: { Note: string };
  }) {
    let preInvoice = this.invoice.value;
    preInvoice.Invoice.InvoicePeriod = values.InvoicePeriod;
    preInvoice.Invoice.InvoiceTypeCode = values.InvoiceTypeCode;
    preInvoice.Invoice.DocumentCurrencyCode = values.DocumentCurrencyCode;
    preInvoice.Invoice.ContractDocumentReference.ID = values.ContractReference;
    preInvoice.Invoice.OrderReference.ID = values.OrderReference;
    preInvoice.Invoice.PaymentTerms = values.PaymentTerms;
  }
  saveInvoice() {}
}
