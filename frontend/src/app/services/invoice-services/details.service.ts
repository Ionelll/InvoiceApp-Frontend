import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class InvoiceDetails {
  public vatPercent = new BehaviorSubject<string>('19');
  public currency = new BehaviorSubject<string>('€');
  public validation = new BehaviorSubject<boolean>(true);
  public invoiceValidation = new BehaviorSubject<boolean>(true);
  private invoiceNr = new Subject<string>();
  public reset = new Subject<boolean>();
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
  setDetailsValidation(value) {
    this.validation.next(value);
  }
  getDetailsValidation() {
    return this.validation.asObservable();
  }
  setInvoiceValidation(value) {
    this.invoiceValidation.next(value);
  }
  getInvoiceValidation() {
    return this.invoiceValidation.asObservable();
  }
  setInvoiceNr(invoiceNr) {
    const invoiceNrList = invoiceNr.match(/([a-zA-Z]+)|(\d+)/g);
    const obj = { pre: '', nr: '', suf: '' };
    switch (invoiceNrList.length) {
      case 1:
        if (!isNaN(invoiceNrList[0])) obj.nr = invoiceNrList[0];
        break;
      case 2:
        if (isNaN(invoiceNrList[0])) {
          obj.nr = invoiceNrList[1];
          obj.pre = invoiceNrList[0];
        } else {
          obj.suf = invoiceNrList[1];
          obj.nr = invoiceNrList[0];
        }
        break;
      case 3:
        obj.pre = invoiceNrList[0];
        obj.nr = invoiceNrList[1];
        obj.suf = invoiceNrList[2];
        break;
      default:
        return;
    }
    const nextInvoiceNr = obj.pre + (parseInt(obj.nr) + 1) + obj.suf;
    this.invoiceNr.next(nextInvoiceNr);
  }
  getInvoiceNr() {
    return this.invoiceNr.asObservable();
  }
  emitResetDetails(value: boolean) {
    this.reset.next(value);
  }
  subscribeResetDetails() {
    return this.reset.asObservable();
  }
}
