import { Component, OnInit } from '@angular/core';
import { InvoiceDetails } from 'src/app/services/invoice-services/details.service';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CurrencySymbolMap } from 'src/app/models/currencies.model';
import { AccountService } from 'src/app/services/account.service';
import { invoiceSettings } from 'src/app/models/invoiceSettings.model';

@Component({
  selector: 'app-invoice-preferences',
  templateUrl: './invoice-preferences.component.html',
  styleUrls: ['./invoice-preferences.component.scss'],
})
export class InvoicePreferencesComponent implements OnInit {
  constructor(
    private details: InvoiceDetails,
    private datePipe: DatePipe,
    private account: AccountService
  ) {}
  duePeriod: number;
  private resetSub = new Subscription();
  public currencies = CurrencySymbolMap;
  public invoiceDetails = new FormGroup({
    InvoicePeriod: new FormGroup({
      StartDate: new FormControl(
        this.datePipe.transform(new Date(), 'yyyy-MM-dd'),
        Validators.required
      ),
      EndDate: new FormControl(
        this.datePipe.transform(
          new Date().setDate(new Date().getDate() + 30),
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
    PaymentTerms: new FormGroup({
      Note: new FormControl(''),
    }),
  });
  initialValues = this.invoiceDetails.value;
  refreshDueDate() {
    let date = new Date(
      this.invoiceDetails.controls.InvoicePeriod.controls.StartDate.value
    );
    const day = date.getDate();
    date.setDate(day + (this.duePeriod || 30));
    this.invoiceDetails.controls.InvoicePeriod.controls.EndDate.setValue(
      this.datePipe.transform(date, 'yyyy-MM-dd')
    );
  }
  ngOnInit(): void {
    localStorage.setItem(
      'InvoiceDetails',
      JSON.stringify(this.invoiceDetails.value)
    );
    this.account.getUser().subscribe((res) => {
      if (res) {
        this.duePeriod = res.invoiceSettings.duePeriod;
        this.invoiceDetails.patchValue(res.invoiceSettings);
        this.refreshDueDate();
      }
    });
    this.resetSub = this.details.subscribeResetDetails().subscribe((res) => {
      this.invoiceDetails.reset(
        JSON.parse(sessionStorage.getItem('InvoiceSettings')) ||
          this.initialValues
      );
      this.invoiceDetails.controls.InvoiceTypeCode.setValue('380');
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
  }
}
