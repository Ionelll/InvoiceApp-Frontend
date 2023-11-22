import { Component, OnInit } from '@angular/core';
import { Adress } from 'src/app/models/adress.model';
import { Bank } from 'src/app/models/bank.model';
import { Company } from 'src/app/models/company.model';
import { User } from 'src/app/models/user.model';
@Component({
  selector: 'app-invoice-preview',
  templateUrl: './invoice-preview.component.html',
  styleUrls: ['./invoice-preview.component.scss'],
})
export class InvoicePreviewComponent implements OnInit {
  public client: Company;
  public company: Company['Party'];
  public bank: Bank;
  public logo;
  public table;
  public invoiceDetails;
  public invoiceNrandDate;
  public deliveryAdress: Adress;
  public delivery: boolean;
  public deliveryDate: Date;
  print() {
    window.print();
  }
  ngOnInit(): void {
    this.client = JSON.parse(localStorage.getItem('Client'));
    this.company = JSON.parse(localStorage.getItem('Company'));
    this.bank = JSON.parse(localStorage.getItem('Bank'));
    this.logo = localStorage.getItem('Logo');
    this.table = JSON.parse(localStorage.getItem('TableValues'))?.array;
    this.invoiceDetails = JSON.parse(localStorage.getItem('InvoiceDetails'));
    this.invoiceNrandDate = JSON.parse(
      localStorage.getItem('InvoiceNrandDate')
    );
    this.delivery = JSON.parse(localStorage.getItem('DeliveryToggle'));
    this.deliveryAdress = JSON.parse(localStorage.getItem('DeliveryAdress'));
    this.deliveryDate = JSON.parse(localStorage.getItem('DeliveryDate'));
  }
}
