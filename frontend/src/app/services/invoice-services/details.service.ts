import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class InvoiceDetails {
  constructor(private http: HttpClient) {}

  public vatPercent = new BehaviorSubject<string>('19');
  public currency = new BehaviorSubject<string>('€');
  setCurrency(value) {
    this.currency.next(value);
  }
  getCurrency() {
    return this.currency.asObservable();
  }
  setvatPercent(value) {
    this.vatPercent.next(value);
  }
  getvatPercent() {
    return this.vatPercent.asObservable();
  }
}
