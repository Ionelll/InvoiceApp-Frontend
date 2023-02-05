import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { Company } from '../models/company.model';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class CreateInvoice {
  public vatpercent = new Subject<string>();
  public netto = new Subject<string>();
  public vat = new Subject<string>();
  public total = new Subject<string>();

  setnetto(x: string) {
    this.netto.next(x);
  }
  getnetto() {
    return this.netto.asObservable();
  }
  setVat(x: string) {
    this.vat.next(x);
  }
  getVat() {
    return this.vat.asObservable();
  }
  setTotal(x: string) {
    this.total.next(x);
  }
  getTotal() {
    return this.total.asObservable();
  }

  setVatPercent(x: string) {
    this.vatpercent.next(x);
  }
  getVatPercent() {
    return this.vatpercent.asObservable();
  }
}
