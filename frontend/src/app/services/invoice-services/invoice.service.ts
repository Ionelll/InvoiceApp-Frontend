import { Injectable } from '@angular/core';
import { Invoice } from 'src/app/models/invoice.model';
import { BehaviorSubject, Subject } from 'rxjs';
import { TaxSubtotal } from 'src/app/models/tax-subtotal.model';
import { Company } from 'src/app/models/company.model';
import { Adress } from 'src/app/models/adress.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environment';

@Injectable({ providedIn: 'root' })
export class InvoiceService {
  constructor(private http: HttpClient) {}
  public invoice = new BehaviorSubject<Invoice>({
    Invoice: {
      InvoiceTypeCode: '',
      ID: '',
      IssueDate: '',
      InvoicePeriod: {
        StartDate: '',
        EndDate: '',
      },
      Note: '',
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
    console.log(this.invoice.value.Invoice);
  }
  set_ID_IssueDate(values: { ID: string; IssueDate: string }) {
    let preInvoice = this.invoice.value;
    preInvoice.Invoice.ID = values.ID;
    preInvoice.Invoice.IssueDate = values.IssueDate;
    this.invoice.next(preInvoice);
    console.log(this.invoice.value.Invoice);
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
    preInvoice.Invoice.Note = values.Note;
    this.invoice.next(preInvoice);
    console.log(this.invoice.value.Invoice);
  }
  setClient(client: Company) {
    let preInvoice = this.invoice.value;
    preInvoice.Invoice.AccountingCustomerParty.Party = client.Party;
    preInvoice.Invoice.BuyerReference = client.Party.BuyerReference;
    this.invoice.next(preInvoice);
  }
  set_Delivery(adress: Adress, date: string) {
    let preInvoice = this.invoice.value;
    preInvoice.Invoice.Delivery = {
      ActualDeliveryDate: date,
      DeliveryLocation: { Adress: adress },
    };
    this.invoice.next(preInvoice);
    console.log(this.invoice.value.Invoice);
  }
  remove_Delivery() {
    let preInvoice = this.invoice.value;
    const { Delivery, ...deliveryRemoved } = this.invoice.value.Invoice;
    preInvoice.Invoice = deliveryRemoved;
    this.invoice.next(preInvoice);
  }
  set_AccountingSupplierParty(company: Company['Party']) {
    let preInvoice = this.invoice.value;
    preInvoice.Invoice.AccountingSupplierParty.Party = company;
    this.invoice.next(preInvoice);
    console.log(this.invoice.value.Invoice);
  }
  set_Total(totalNoVat: number, totalWithVat: number) {
    let preInvoice = this.invoice.value;
    preInvoice.Invoice.LegalMonetaryTotal = {
      LineExtensionAmount: totalNoVat.toFixed(2),
      TaxExclusiveAmount: totalNoVat.toFixed(2),
      TaxInclusiveAmount: totalWithVat.toFixed(2),
      PayableAmount: totalWithVat.toFixed(2),
    };
    this.invoice.next(preInvoice);
    console.log(this.invoice.value.Invoice);
  }
  set_Lines(lines) {
    let preInvoice = this.invoice.value;
    preInvoice.Invoice.Lines = lines;
  }
  set_PaymentMeans(values) {
    let preInvoice = this.invoice.value;
    preInvoice.Invoice.PaymentMeans.PaymentCode = '31';
    preInvoice.Invoice.PaymentMeans.PaymentID = Math.random()
      .toString(36)
      .slice(2);
    preInvoice.Invoice.PaymentMeans.PayeeFinancialAccount = values;
  }
  newInvoice() {
    this.invoice.next({
      Invoice: {
        InvoiceTypeCode: '',
        ID: '',
        IssueDate: '',
        InvoicePeriod: {
          StartDate: '',
          EndDate: '',
        },
        Note: '',
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

    this.set_AccountingSupplierParty(
      JSON.parse(localStorage.getItem('Company'))
    );
  }
  saveInvoice() {
    this.http
      .post(`${environment.apiUrl}/save-invoice`, this.invoice.value.Invoice)
      .subscribe();
  }
}
