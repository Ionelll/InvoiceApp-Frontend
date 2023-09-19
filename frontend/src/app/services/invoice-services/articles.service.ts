import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { Company } from '../../models/company.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment/environment';

@Injectable({ providedIn: 'root' })
export class CreateInvoice {
  public vatpercent = new BehaviorSubject<string>('');
  public duePeriod = new BehaviorSubject<string>('');
  public netto = new BehaviorSubject<string>('');
  public vat = new BehaviorSubject<string>('');
  public total = new BehaviorSubject<string>('');
  public client = new BehaviorSubject<Company>(undefined);
  public clientList = new BehaviorSubject<string[]>([]);
  public table = new BehaviorSubject<
    { articol: string; unit: string; bucati: string; pret: string }[]
  >([{ articol: '', unit: '', bucati: '', pret: '' }]);
  public currency = new BehaviorSubject<string>('');
  constructor(private http: HttpClient) {}

  setnetto(x: string) {
    this.netto.next(x);
  }

  getnetto() {
    return this.netto.asObservable();
  }

  setVat(x: string) {
    this.vat.next(x);
  }
  setCurrency(x: string) {
    this.currency.next(x);
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
  setDuePeriod(x: string) {
    this.duePeriod.next(x);
  }
  getVatPercent() {
    return this.vatpercent.asObservable();
  }
  getDuePeriod() {
    return this.duePeriod.asObservable();
  }

  clearTable() {
    this.table.next([{ articol: '', unit: '', bucati: '', pret: '' }]);
    localStorage.removeItem('TabelValues');
  }
}
