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
    startDate: new FormControl(
      this.datePipe.transform(new Date(), 'yyyy-MM-dd'),
      Validators.required
    ),
    endDate: new FormControl(
      this.datePipe.transform(
        new Date().setDate(new Date().getDate() + this.duePeriod),
        'yyyy-MM-dd'
      ),
      Validators.required
    ),
    vatPercent: new FormControl('19', Validators.required),
    invoiceType: new FormControl('380', Validators.required),
    currency: new FormControl('€', Validators.required),
    introduction: new FormControl(
      'Thank you for your order and your trust. You will be charged the following amount for our work and material:'
    ),
    notes: new FormControl(''),
    orderRef: new FormControl(''),
    contractRef: new FormControl(''),
  });

  refreshDueDate() {
    let date = new Date(this.invoiceDetails.controls.startDate.value);
    const day = date.getDate();
    date.setDate(day + this.duePeriod);
    this.invoiceDetails.controls.endDate.setValue(
      this.datePipe.transform(date, 'yyyy-MM-dd')
    );
  }
  ngOnInit(): void {
    this.resetSub = this.details.subscribeResetDetails().subscribe((res) => {
      this.invoiceDetails.patchValue(
        JSON.parse(sessionStorage.getItem('InvoiceDetails')) ||
          JSON.parse(localStorage.getItem('InvoiceDetails'))
      );
      this.invoiceDetails.controls.startDate.setValue(
        this.datePipe.transform(new Date(), 'yyyy-MM-dd')
      );
      this.refreshDueDate();
    });
    this.invoiceDetails.valueChanges.subscribe((values) => {
      localStorage.setItem('InvoiceDetails', JSON.stringify(values));
      this.details.setDetailsValidation(this.invoiceDetails.valid);
    });
    this.invoiceDetails.controls.vatPercent.valueChanges.subscribe((value) => {
      this.details.setvatPercent(value);
    });
    this.invoiceDetails.controls.currency.valueChanges.subscribe((value) => {
      this.details.setCurrency(value);
    });
    this.invoiceDetails.patchValue(
      JSON.parse(localStorage.getItem('InvoiceDetails')) ||
        JSON.parse(sessionStorage.getItem('InvoiceDetails'))
    );
  }
}
