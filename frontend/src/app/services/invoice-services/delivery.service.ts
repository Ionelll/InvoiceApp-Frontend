import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class deliveryService {
  deliveryValidation = new Subject<boolean>();
  setValidation(valid: boolean) {
    this.deliveryValidation.next(valid);
  }
  getValidation() {
    return this.deliveryValidation.asObservable();
  }
}
