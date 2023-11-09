import { Component, OnInit } from '@angular/core';
import { InvoiceDetails } from 'src/app/services/invoice-services/details.service';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-invoice-preferences',
  templateUrl: './invoice-preferences.component.html',
  styleUrls: ['./invoice-preferences.component.scss'],
})
export class InvoicePreferencesComponent implements OnInit {
  constructor(private details: InvoiceDetails, private datePipe: DatePipe) {}
  public duePeriod = parseInt(sessionStorage.getItem('DUE-PERIOD')) || 30;
  private resetSub = new Subscription();
  public invoiceDetails = new FormGroup({
    InvoicePeriod: new FormGroup({
      StartDate: new FormControl(
        this.datePipe.transform(new Date(), 'yyyy-MM-dd'),
        Validators.required
      ),
      EndDate: new FormControl(
        this.datePipe.transform(
          new Date().setDate(new Date().getDate() + this.duePeriod),
          'yyyy-MM-dd'
        ),
        Validators.required
      ),
    }),
    InvoiceTypeCode: new FormControl('380', Validators.required),
    DocumentCurrencyCode: new FormControl('EUR', Validators.required),
    introduction: new FormControl(
      'Thank you for your order and your trust. You will be charged the following amount for our work and material:'
    ),
    Note: new FormControl(''),
    OrderReference: new FormControl(''),
    ContractReference: new FormControl(''),
  });

  refreshDueDate() {
    let date = new Date(
      this.invoiceDetails.controls.InvoicePeriod.controls.StartDate.value
    );
    const day = date.getDate();
    date.setDate(day + this.duePeriod);
    this.invoiceDetails.controls.InvoicePeriod.controls.EndDate.setValue(
      this.datePipe.transform(date, 'yyyy-MM-dd')
    );
  }
  ngOnInit(): void {
    this.resetSub = this.details.subscribeResetDetails().subscribe((res) => {
      this.invoiceDetails.patchValue(
        JSON.parse(sessionStorage.getItem('InvoiceDetails')) ||
          JSON.parse(localStorage.getItem('InvoiceDetails'))
      );
      this.invoiceDetails.controls.InvoicePeriod.controls.StartDate.setValue(
        this.datePipe.transform(new Date(), 'yyyy-MM-dd')
      );
      this.refreshDueDate();
    });
    this.invoiceDetails.valueChanges.subscribe((values) => {
      localStorage.setItem('InvoiceDetails', JSON.stringify(values));
      this.details.setDetailsValidation(this.invoiceDetails.valid);
    });
    this.invoiceDetails.controls.DocumentCurrencyCode.valueChanges.subscribe(
      (value) => {
        this.details.setCurrency(value);
      }
    );
    this.invoiceDetails.patchValue(
      JSON.parse(localStorage.getItem('InvoiceDetails')) ||
        JSON.parse(sessionStorage.getItem('InvoiceDetails'))
    );
  }
}
