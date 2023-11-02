import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Company } from '../models/company.model';
import { environment } from 'src/environment/environment';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { InvoiceDetails } from './invoice-services/details.service';

@Injectable({ providedIn: 'root' })
export class AccountService {
  private user = new BehaviorSubject<User>(undefined);
  private company = new BehaviorSubject<Company>(undefined);
  private companyValidation = new Subject<boolean>();

  constructor(
    private http: HttpClient,
    private router: Router,
    private details: InvoiceDetails
  ) {}

  login(form: FormData) {
    this.http
      .post<{ loggedin: string; user: User }>(
        `${environment.apiUrl}/login`,
        form
      )
      .subscribe((res) => {
        this.user.next(res.user);
        this.company.next(res.user.company);
        console.log(res);
        sessionStorage.setItem('VAT-PERCENT', res.user.preferedVat);
        sessionStorage.setItem('DUE-PERIOD', res.user.preferedDuePeriod);
        sessionStorage.setItem('CURRENCY', res.user.preferedCurrency);
        sessionStorage.setItem('ARTICLES', JSON.stringify(res.user.articles));
        localStorage.setItem('Company', JSON.stringify(res.user.company));
        this.details.setInvoiceNr(res.user.nextInvoiceNr);
        this.router.navigate(['invoice']);
      });
  }

  isLoggedIn() {
    this.http
      .get<{ loggedin: boolean; user: User }>(
        `${environment.apiUrl}/isloggedin`
      )
      .subscribe((res) => {
        console.log(res);
        if (res.loggedin) {
          this.user.next(res.user);
          this.company.next(res.user.company);
        } else this.user.next(undefined);
      });
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
    this.http.get(`${environment.apiUrl}/logout`).subscribe();
    window.location.reload();
  }

  updateCompany(company: FormData) {
    this.http
      .post<{ company: Company; message: string }>(
        `${environment.apiUrl}/updatecompany`,
        company
      )
      .subscribe((res) => {
        this.company.next(res.company);
      });
  }
  register(form: FormData) {
    this.http
      .post<Company>(`${environment.apiUrl}/register`, form)
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
}
