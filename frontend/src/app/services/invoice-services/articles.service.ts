import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CreateInvoice {
  public netto = new BehaviorSubject<string>('');
  public vat = new BehaviorSubject<string>('');
  public total = new BehaviorSubject<string>('');
  public table = new Subject();
  public currency = new BehaviorSubject<string>('');
  public articlesValidation = new BehaviorSubject<boolean>(true);

  setnetto(x: string) {
    localStorage.setItem('TaxExclusiveAmount', x);
    this.netto.next(x);
  }

  getnetto() {
    return this.netto.asObservable();
  }

  setVat(x: string) {
    localStorage.setItem('TaxAmount', x);
    this.vat.next(x);
  }

  getVat() {
    return this.vat.asObservable();
  }

  setTotal(x: string) {
    localStorage.setItem('TaxInclusiveAmount', x);
    this.total.next(x);
  }

  getTotal() {
    return this.total.asObservable();
  }

  clearTable() {
    this.table.next([{ articol: '', unit: '', bucati: '', pret: '' }]);
    localStorage.removeItem('TabelValues');
  }
  subscribeClearTable() {
    return this.table.asObservable();
  }
  setArticlesValidation(value) {
    this.articlesValidation.next(value);
  }
  getArticlesValidation() {
    return this.articlesValidation.asObservable();
  }
}
