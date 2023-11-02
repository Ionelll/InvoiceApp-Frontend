import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { InvoiceDetails } from 'src/app/services/invoice-services/details.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dates',
  templateUrl: './invoice-dates.component.html',
  styleUrls: ['./invoice-dates.component.scss'],
})
export class InvoiceDatesComponent implements OnInit {
  constructor(private datePipe: DatePipe, private details: InvoiceDetails) {}

  NumberandDateSub = new Subscription();
  invoiceNrSub = new Subscription();
  resetSub = new Subscription();

  invoiceNrandDate = new FormGroup({
    invoiceNr: new FormControl('', Validators.required),
    issued: new FormControl(
      this.datePipe.transform(new Date(), 'yyyy-MM-dd'),
      Validators.required
    ),
  });
  ngOnInit(): void {
    this.invoiceNrandDate.patchValue(
      JSON.parse(localStorage.getItem('InvoiceNrandDate'))
    );
    this.invoiceNrandDate.valueChanges.subscribe(() => {
      localStorage.setItem(
        'InvoiceNrandDate',
        JSON.stringify(this.invoiceNrandDate.value)
      );
      this.details.setInvoiceValidation(this.invoiceNrandDate.valid);
    });
    this.details.getInvoiceNr().subscribe((res) => {
      this.invoiceNrandDate.controls.invoiceNr.setValue(res);
    });
    this.resetSub = this.details.subscribeResetDetails().subscribe((res) => {
      this.invoiceNrandDate.controls.issued.setValue(
        this.datePipe.transform(new Date(), 'yyyy-MM-dd')
      );
    });
  }
}
