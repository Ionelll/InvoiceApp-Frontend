import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Company } from '../models/company.model';
import { environment } from '../../../environment';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { InvoiceDetails } from './invoice-services/details.service';
import { Item } from '../models/item.model';
import { InvoiceService } from './invoice-services/invoice.service';

@Injectable({ providedIn: 'root' })
export class AccountService {
  private user = new BehaviorSubject<User>(undefined);
  private company = new BehaviorSubject<Company['Party']>(undefined);
  private companyValidation = new Subject<boolean>();

  constructor(
    private http: HttpClient,
    private router: Router,
    private details: InvoiceDetails,
    private invoice: InvoiceService
  ) {}

  login(form: FormData) {
    this.http
      .post<{ loggedin: string; user: User; token: string }>(
        `${environment.apiUrl}/login`,
        form
      )
      .subscribe((res) => {
        if (!res) return;
        localStorage.setItem('token', res.token);
        this.user.next(res.user);
        this.company.next(res.user.Party);
        this.invoice.set_AccountingSupplierParty(res.user.Party);
        sessionStorage.setItem(
          'InvoiceSettings',
          JSON.stringify(res.user.invoiceSettings)
        );
        sessionStorage.setItem('Articles', JSON.stringify(res.user.Items));
        localStorage.setItem('Company', JSON.stringify(res.user.Party));
        localStorage.setItem('Logo', res.user.Logo);
        this.details.setInvoiceNr(res.user.lastInvoiceNr);
        this.router.navigate(['invoice']);
      });
  }

  isLoggedIn() {
    let isloggedin: boolean;
    this.http
      .get<{ loggedin: boolean; user: User }>(
        `${environment.apiUrl}/isloggedin`
      )
      .subscribe((res) => {
        isloggedin = res.loggedin;
        console.log(res);
        if (res.loggedin) {
          this.user.next(res.user);
          sessionStorage.setItem(
            'InvoiceSettings',
            JSON.stringify(res.user.invoiceSettings)
          );
          sessionStorage.setItem('Articles', JSON.stringify(res.user.Items));
          localStorage.setItem('Company', JSON.stringify(res.user.Party));
          localStorage.setItem('Logo', res.user.Logo);
          this.details.setInvoiceNr(res.user.lastInvoiceNr);
          this.company.next(res.user.Party);
          this.invoice.set_AccountingSupplierParty(res.user.Party);
          this.invoice.set_PaymentMeans(res.user.PayeeFinancialAccount);
          localStorage.setItem(
            'Bank',
            JSON.stringify(res.user.PayeeFinancialAccount)
          );
        } else {
          this.user.next(undefined);
        }
      });
  }
  getIsLoggedIn() {
    if (this.user.value) return true;
    else return false;
  }
  getUser() {
    return this.user.asObservable();
  }
  getCompany() {
    return this.company.asObservable();
  }
  logout() {
    this.user.next(undefined);
    localStorage.clear();
    sessionStorage.clear();
    this.http.get(`${environment.apiUrl}/logout`).subscribe();
    window.location.reload();
  }

  updateCompany(company) {
    console.log(company);
    this.http
      .post<{ user: User; message: string }>(
        `${environment.apiUrl}/updatecompany`,
        company
      )
      .subscribe((res) => {
        this.user.next(res.user);
      });
  }
  register(form: FormData) {
    this.http
      .post<Company['Party']>(`${environment.apiUrl}/register`, form)
      .subscribe((res) => {
        this.company.next(res);
      });
  }
  setCompanyValidation(value) {
    this.companyValidation.next(value);
  }
  getCompanyValidation() {
    return this.companyValidation.asObservable();
  }
  updateItems(items: Item[]) {
    this.http
      .post<{ result: User }>(`${environment.apiUrl}/updateItems`, items)
      .subscribe((res) => {
        if (res) {
          this.user.next(res.result);
          sessionStorage.setItem('Articles', JSON.stringify(res.result.Items));
        }
      });
  }
  updateSettings(settings) {
    this.http
      .post<{ result: User }>(`${environment.apiUrl}/update-settings`, settings)
      .subscribe((res) => {
        this.user.next(res.result);
        sessionStorage.setItem(
          'InvoiceSettings',
          JSON.stringify(res.result.invoiceSettings)
        );
      });
  }
}
