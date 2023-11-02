import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Company } from '../../models/company.model';
import { environment } from 'src/environment/environment';
import { BehaviorSubject, Subject } from 'rxjs';
import { Client } from '../../models/client.model';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  constructor(private http: HttpClient) {}

  private client = new Subject<Client>();
  private clientName = new Subject<string>();
  private clientList = new BehaviorSubject<string[]>([]);
  private form = new BehaviorSubject<{
    pristine: boolean;
    dirty: boolean;
    valid: boolean;
  }>({ pristine: true, dirty: false, valid: true });

  searchClient(clientName: string) {
    this.http
      .get<{ result: Client }>(`${environment.apiUrl}/client/${clientName}`)
      .subscribe((res) => {
        if (res.result) {
          this.client.next(res.result);
          localStorage.setItem('ClientId', res.result._id);
          localStorage.setItem('Client', JSON.stringify(res.result));
          this.formValidation(true, false, true);
        }
      });
  }

  getClient() {
    return this.client.asObservable();
  }
  setClientName(name: string) {
    this.clientName.next(name);
  }
  getClientName() {
    return this.clientName.asObservable();
  }
  clearClient() {
    localStorage.removeItem('Client');
    localStorage.removeItem('ClientId');
    this.client.next({
      companyName: null,
      registrationNumber: null,
      euid: null,
      adress: {
        street: null,
        number: null,
        postalCode: null,
        city: null,
        region: null,
        country: null,
      },
      phone: null,
      email: null,
    });
  }
  formValidation(dirty: boolean, pristine: boolean, valid: boolean) {
    this.form.next({
      dirty: dirty,
      pristine: pristine,
      valid: valid,
    });
  }
  getFormValidation() {
    return this.form.asObservable();
  }
  saveClient(clientID) {
    if (!clientID) {
      this.http
        .post<Company>(
          `${environment.apiUrl}/addclient`,
          JSON.parse(sessionStorage.getItem('Client'))
        )
        .subscribe((res) => {
          this.client.next(res);
          this.formValidation(false, true, false);
        });
    } else {
      this.http
        .post(`${environment.apiUrl}/updateclient`, {
          client: JSON.parse(localStorage.getItem('Client')),
          id: clientID,
        })
        .subscribe((res) => {
          this.client.next(res);
          this.formValidation(false, true, false);
        });
    }
  }

  setClients(value: string) {
    this.http
      .get(`${environment.apiUrl}/clients/${value}`)
      .subscribe((res: { list: string[] }) => {
        this.clientList.next(res.list);
      });
  }

  getClients() {
    return this.clientList.asObservable();
  }
  reloadClient(clientID) {
    if (clientID) {
      this.http
        .get<{ result: Client }>(
          `${environment.apiUrl}/getclientbyid/${clientID}
          `
        )
        .subscribe((res) => {
          this.client.next(res.result);
        });
    } else {
      this.clearClient();
    }
  }
}
