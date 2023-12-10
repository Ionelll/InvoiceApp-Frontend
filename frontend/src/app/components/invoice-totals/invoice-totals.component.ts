import { Component, OnInit } from '@angular/core';
import { CreateInvoice } from 'src/app/services/invoice-services/articles.service';
import { InvoiceDetails } from 'src/app/services/invoice-services/details.service';

@Component({
  selector: 'app-invoice-totals',
  templateUrl: './invoice-totals.component.html',
  styleUrls: ['./invoice-totals.component.scss'],
})
export class InvoiceTotalsComponent implements OnInit {
  constructor(
    private invoice: CreateInvoice,
    private details: InvoiceDetails
  ) {}
  public netto = '';
  public total = '';
  public vat = '';
  public currency = JSON.parse(localStorage.getItem('InvoiceDetails'))
    ?.DocumentCurrencyCode;
  ngOnInit(): void {
    this.details.getCurrency().subscribe((res) => {
      this.currency = res;
    });
    this.invoice.getVat().subscribe((res) => {
      if (!isNaN(parseFloat(res))) this.vat = res;
      else this.vat = '0.00';
    });
    this.invoice.getnetto().subscribe((res) => {
      if (!isNaN(parseFloat(res))) this.netto = res;
      else this.netto = '0.00';
    });
    this.invoice.getTotal().subscribe((res) => {
      if (!isNaN(parseFloat(res))) this.total = res;
      else this.total = '0.00';
    });
  }
}
