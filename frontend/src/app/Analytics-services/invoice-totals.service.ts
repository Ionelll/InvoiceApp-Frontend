import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class InvoiceTotals {
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
}
