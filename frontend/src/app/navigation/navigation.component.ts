import { trigger, transition, animate, style } from '@angular/animations';
import {
  Component,
  OnInit,
  AfterViewChecked,
  ChangeDetectorRef,
} from '@angular/core';
import { ApiService } from '../services/api.service';

import { User } from '../models/user.model';
import { InvoiceTotals } from '../Analytics-services/invoice-totals.service';
import { CreateInvoice } from '../services/create-invoice.service';

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
export class NavigationComponent implements OnInit, AfterViewChecked {
  user: { username: string; email: string };
  listToggle = true;
  netto = '';
  vat = '';
  total = '';
  animif = true;
  vatpercent = '';

  constructor(
    private api: ApiService,
    private totals: InvoiceTotals,
    private cd: ChangeDetectorRef,
    private invoice: CreateInvoice
  ) {}
  ngOnInit(): void {
    this.invoice.setVatPercent('19');
    this.netto = localStorage.getItem('Netto');
    this.vat = localStorage.getItem('Vat');
    this.total = localStorage.getItem('Total');
    this.user = JSON.parse(localStorage.getItem('User'));
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
  ngAfterViewChecked(): void {
    this.totals.getnetto().subscribe((res) => {
      this.netto = res;
    });
    this.totals.getVat().subscribe((res) => {
      this.vat = res;
    });
    this.totals.getTotal().subscribe((res) => {
      this.total = res;
    });
    this.invoice.getVatPercent().subscribe((res) => {
      console.log(res);
      this.vatpercent = res;
    });
    this.animif = false;
  }
}
