import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Company } from '../../models/company.model';
import { environment } from 'src/environment/environment';
import { BehaviorSubject } from 'rxjs';
import { Client } from '../../models/client.model';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  constructor(private http: HttpClient) {}

  private client = new BehaviorSubject<Client>(undefined);
  private clientList = new BehaviorSubject<string[]>([]);
  private form = new BehaviorSubject<{
    pristine: boolean;
    dirty: boolean;
    valid: boolean;
  }>({ pristine: true, dirty: false, valid: false });

  searchClient(clientName: string) {
    this.http
      .get<{ result: Client }>(`${environment.apiUrl}/client/${clientName}`)
      .subscribe((res) => {
        if (res.result) {
          this.client.next(res.result);
          localStorage.setItem('ClientId', res.result._id);
          localStorage.setItem('Client', JSON.stringify(res.result));
          this.formValidation(false, true, false);
        }
      });
  }

  getClient() {
    return this.client.asObservable();
  }

  clearClient() {
    sessionStorage.removeItem('Client');
    sessionStorage.removeItem('ClientId');
    this.client.next({
      companyName: '',
      registrationNumber: '',
      euid: '',
      adress: {
        street: '',
        number: '',
        postalCode: '',
        city: '',
        region: '',
        country: '',
      },
      phone: '',
      email: '',
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
  saveClient() {
    if (!sessionStorage.getItem('ClientId')) {
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
          client: JSON.parse(sessionStorage.getItem('Client')),
          id: this.client.value._id,
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
  reloadClient() {
    if (sessionStorage.getItem('ClientId')) {
      this.http
        .get<{ result: Client }>(
          `${environment.apiUrl}/getclientbyid/${sessionStorage.getItem(
            'ClientId'
          )}`
        )
        .subscribe((res) => {
          this.client.next(res.result);
          this.formValidation(false, true, false);
        });
    } else {
      this.clearClient();
    }
  }
}
