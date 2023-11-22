import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Adress } from '../models/adress.model';

@Injectable({ providedIn: 'root' })
export class ModalService {
  private openModalEmmiter = new Subject<string>();
  private updated = new Subject<{ id: string; PostalAdress: Adress }>();

  openModal(id: string) {
    this.openModalEmmiter.next(id);
  }

  subscribeOpenModal() {
    return this.openModalEmmiter.asObservable();
  }
  closeModal(id: string, PostalAdress: Adress) {
    this.updated.next({ id, PostalAdress });
  }
  subscribeCloseModal() {
    return this.updated.asObservable();
  }
}
