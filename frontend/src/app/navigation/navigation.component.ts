import { trigger, transition, animate, style } from '@angular/animations';
import {
  Component,
  OnInit,
  AfterViewInit,
  ChangeDetectorRef,
} from '@angular/core';
import { ApiService } from '../services/api.service';

import { User } from '../models/user.model';
import { CreateInvoice } from '../services/create-invoice.service';
import { Company } from '../models/company.model';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  animations: [
    trigger('enterleave', [
      transition(':leave', [
        animate('500ms', style({ height: 0, opacity: 0 })),
      ]),
      transition(':enter', [
        style({ height: 0, opacity: 0 }),
        animate('500ms'),
      ]),
    ]),
  ],
})
export class NavigationComponent implements OnInit, AfterViewInit {
  company: Company;
  listToggle = true;
  netto = '';
  vat = '';
  total = '';
  animif = true;
  vatpercent = '';

  constructor(private invoice: CreateInvoice) {}
  ngOnInit(): void {
    this.invoice.setVat('19');
    this.company = JSON.parse(localStorage.getItem('Company'));
    // this.api.getUser()
    // this.api.user$.subscribe(res=>{this.user=res})
    if (window.location.pathname.split('/')[1] == 'dashboard') {
      this.listToggle = false;
    }
  }
  export() {
    window.print();

    window.location.reload();
  }
  getNetto() {
    return this.netto;
  }
  getVat() {
    return this.vat;
  }
  getTotal() {
    return this.total;
  }
  ngAfterViewInit(): void {
    this.invoice.getnetto().subscribe((res) => {
      this.netto = res;
    });
    this.invoice.getVat().subscribe((res) => {
      this.vat = res;
    });
    this.invoice.getTotal().subscribe((res) => {
      this.total = res;
    });
    this.invoice.getVatPercent().subscribe((res) => {
      console.log(res);
      this.vatpercent = res;
    });
    this.animif = false;
  }
}
