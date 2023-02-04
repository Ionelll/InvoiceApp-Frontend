import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { Company } from '../models/company.model';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class CreateInvoice {
  vatpercent = new Subject<string>();

  setVatPercent(x: string) {
    this.vatpercent.next(x);
  }
  getVatPercent() {
    return this.vatpercent.asObservable();
  }
}
