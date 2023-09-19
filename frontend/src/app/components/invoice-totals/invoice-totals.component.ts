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
  public currency: string;
  ngOnInit(): void {
    this.details.getCurrency().subscribe((res) => {
      this.currency = res;
    });
    this.invoice.getVat().subscribe((res) => {
      this.vat = res;
    });
    this.invoice.getnetto().subscribe((res) => {
      this.netto = res;
    });
    this.invoice.getTotal().subscribe((res) => {
      this.total = res;
    });
  }
}
