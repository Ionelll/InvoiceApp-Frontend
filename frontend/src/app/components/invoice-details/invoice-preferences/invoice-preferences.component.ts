import { Component, OnInit } from '@angular/core';
import { InvoiceDetails } from 'src/app/services/invoice-services/details.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-invoice-preferences',
  templateUrl: './invoice-preferences.component.html',
  styleUrls: ['./invoice-preferences.component.scss'],
})
export class InvoicePreferencesComponent implements OnInit {
  constructor(private details: InvoiceDetails, private datePipe: DatePipe) {}
  public vatPercent: string;
  public currency: string;
  public invoiceType: string = localStorage.getItem('InvoiceType');
  public orderRef: string = localStorage.getItem('OrderRef');
  public contractRef: string = localStorage.getItem('ContractRef');
  public duePeriod = parseInt(sessionStorage.getItem('DUE-PERIOD')) || 30;
  startDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  dueDate = this.datePipe.transform(
    new Date().setDate(new Date().getDate() + this.duePeriod),
    'yyyy-MM-dd'
  );
  setCurrency() {
    this.details.setCurrency(this.currency);
  }
  setVATPercent() {
    this.details.setvatPercent(this.vatPercent);
  }
  setInvoiceType() {
    localStorage.setItem('InvoiceType', this.invoiceType);
  }
  setOrderRef() {
    localStorage.setItem('OrderRef', this.orderRef);
  }
  setContractRef() {
    localStorage.setItem('ContractRef', this.contractRef);
  }
  refreshDueDate() {
    let date1 = new Date(this.startDate);
    const day = date1.getDate();
    date1.setDate(day + this.duePeriod);
    this.dueDate = this.datePipe.transform(date1, 'yyyy-MM-dd');
  }
  saveData() {
    localStorage.setItem(
      'AdresareText',
      document.getElementById('adresaretext').innerHTML
    );
  }
  ngOnInit(): void {
    this.details.getCurrency().subscribe((res) => {
      this.currency = res;
    });
    this.details.getvatPercent().subscribe((res) => {
      this.vatPercent = res;
    });
  }
}
