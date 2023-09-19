import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-dates',
  templateUrl: './invoice-dates.component.html',
  styleUrls: ['./invoice-dates.component.scss'],
})
export class InvoiceDatesComponent {
  constructor(private datePipe: DatePipe) {}

  invoiceNr: string = localStorage.getItem('InvoiceNr');
  issued = this.datePipe.transform(new Date(), 'yyyy-MM-dd');


  saveInvoiceNr() {
    localStorage.setItem('InvoiceNr', this.invoiceNr);
  }

}
