import { Component, OnInit } from '@angular/core';
import { Adress } from 'src/app/models/adress.model';
import { Company } from 'src/app/models/company.model';
import { User } from 'src/app/models/user.model';
@Component({
  selector: 'app-invoice-preview',
  templateUrl: './invoice-preview.component.html',
  styleUrls: ['./invoice-preview.component.scss'],
})
export class InvoicePreviewComponent {
  public client: Company = JSON.parse(localStorage.getItem('Client'));
  public user: User = JSON.parse(sessionStorage.getItem('User'));
  public company: Company = JSON.parse(localStorage.getItem('Company'));
  public logo = localStorage.getItem('Logo');
  public table = JSON.parse(localStorage.getItem('TableValues'));
  public invoiceDetails = JSON.parse(localStorage.getItem('InvoiceDetails'));
  public invoiceNrandDate = JSON.parse(
    localStorage.getItem('InvoiceNrandDate')
  );
  public deliveryAdress: Adress = JSON.parse(
    localStorage.getItem('DeliveryAdress')
  ) || {
    street: 'Metanulyui',
    number: 20,
    country: 'Indonezia',
    region: 'Carpati',
    city: 'Budapesta',
    postalCode: '3215151',
  };
  print() {
    window.print();
  }
}
