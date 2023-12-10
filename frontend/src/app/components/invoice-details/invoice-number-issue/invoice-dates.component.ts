import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { InvoiceDetails } from 'src/app/services/invoice-services/details.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription, debounceTime } from 'rxjs';
import { InvoiceService } from 'src/app/services/invoice-services/invoice.service';

@Component({
  selector: 'app-dates',
  templateUrl: './invoice-dates.component.html',
  styleUrls: ['./invoice-dates.component.scss'],
})
export class InvoiceDatesComponent implements OnInit {
  constructor(
    private datePipe: DatePipe,
    private details: InvoiceDetails,
    private invoice: InvoiceService
  ) {}

  NumberandDateSub = new Subscription();
  invoiceNrSub = new Subscription();
  resetSub = new Subscription();

  invoiceNrandDate = new FormGroup({
    ID: new FormControl('', Validators.required),
    IssueDate: new FormControl(
      this.datePipe.transform(new Date(), 'yyyy-MM-dd'),
      Validators.required
    ),
  });
  ngOnInit(): void {
    this.invoiceNrandDate.patchValue(
      JSON.parse(localStorage.getItem('InvoiceNrandDate'))
    );

    this.invoiceNrandDate.valueChanges.pipe(debounceTime(500)).subscribe(() => {
      localStorage.setItem(
        'InvoiceNrandDate',
        JSON.stringify(this.invoiceNrandDate.value)
      );
      this.invoice.set_ID_IssueDate(this.invoiceNrandDate.getRawValue());
      this.details.setInvoiceValidation(this.invoiceNrandDate.valid);
    });
    this.details.getInvoiceNr().subscribe((res) => {
      this.invoiceNrandDate.controls.ID.setValue(res);
    });
    this.resetSub = this.details.subscribeResetDetails().subscribe((res) => {
      this.invoiceNrandDate.controls.IssueDate.setValue(
        this.datePipe.transform(new Date(), 'yyyy-MM-dd')
      );
    });
    this.details.setInvoiceValidation(this.invoiceNrandDate.valid);
    this.invoice.set_ID_IssueDate(this.invoiceNrandDate.getRawValue());
  }
}
