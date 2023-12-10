import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Company } from '../../models/company.model';
import { environment } from '../../../../../environment';
import { BehaviorSubject, Subject } from 'rxjs';
import { InvoiceService } from './invoice.service';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  constructor(private http: HttpClient, private invoice: InvoiceService) {}

  private client = new Subject<Company>();
  private clientName = new Subject<string>();
  private clientList = new BehaviorSubject<string[]>([]);
  private form = new BehaviorSubject<{
    pristine: boolean;
    dirty: boolean;
    valid: boolean;
  }>({ pristine: true, dirty: false, valid: true });

  searchClient(clientName: string) {
    this.http
      .get<{ result: Company }>(
        `${environment.apiUrl}/returncustomer/${clientName}`
      )
      .subscribe((res) => {
        if (res.result) {
          this.client.next(res.result);
          localStorage.setItem(
            'AccountingCustomerParty',
            JSON.stringify(res.result)
          );
          this.invoice.setClient(res.result);
          this.formValidation(true, false, true);
        }
      });
  }

  getClient() {
    return this.client.asObservable();
  }

  setClient(client) {
    this.client.next(client);
  }

  clearClient() {
    localStorage.removeItem('AccountingCustomerParty');
    localStorage.removeItem('ClientId');
    this.client.next({
      Party: {
        PartyName: null,
        PartyIdentification: null,
        EndpointID: null,
        PostalAdress: {
          StreetName: null,
          BuildingNumber: null,
          PostalZone: null,
          CityName: null,
          CountrySubentity: null,
          Country: { IdentificationCode: null },
        },
        Contact: {
          Name: null,
          Telephone: null,
          ElectronicMail: null,
        },
      },
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
          `${environment.apiUrl}/addcustomer`,
          JSON.parse(sessionStorage.getItem('AccountingCustomerParty'))
        )
        .subscribe((res) => {
          this.client.next(res);
          this.formValidation(false, true, false);
        });
    } else {
      this.http
        .post<Company>(`${environment.apiUrl}/updatecustomer`, {
          client: JSON.parse(localStorage.getItem('AccountingCustomerParty')),
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
      .get(`${environment.apiUrl}/searchcustomer/${value}`)
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
        .get<{ result: Company }>(
          `${environment.apiUrl}/getcustomerbyid/${clientID}
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
