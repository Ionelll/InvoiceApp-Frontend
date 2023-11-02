import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { Company } from '../../models/company.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment/environment';

@Injectable({ providedIn: 'root' })
export class CreateInvoice {
  public netto = new BehaviorSubject<string>('');
  public vat = new BehaviorSubject<string>('');
  public total = new BehaviorSubject<string>('');
  public table = new Subject();
  public currency = new BehaviorSubject<string>('');
  public articlesValidation = new BehaviorSubject<boolean>(true);

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
