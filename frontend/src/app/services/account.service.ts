import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Company } from '../models/company.model';
import { environment } from 'src/environment/environment';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { CreateInvoice } from './invoice-services/articles.service';

@Injectable({ providedIn: 'root' })
export class AccountService {
  private user = new BehaviorSubject<User>(undefined);

  constructor(private http: HttpClient, private router: Router) {}

  login(form: FormData) {
    this.http
      .post<User>(`${environment.apiUrl}/login`, form)
      .subscribe((res) => {
        this.user.next(res);
        sessionStorage.setItem('VAT-PERCENT', res.preferedVat);
        sessionStorage.setItem('DUE-PERIOD', res.preferedDuePeriod);
        sessionStorage.setItem('CURRENCY', res.preferedCurrency);
        sessionStorage.setItem('ARTICLES', JSON.stringify(res.articles));
        this.router.navigate(['invoice']);
      });
  }

  isLoggedIn() {
    this.http
      .get<{ loggedin: boolean; user: User }>(
        `${environment.apiUrl}/isloggedin`
      )
      .subscribe((res) => {
        if (res.loggedin) this.user.next(res.user);
        else this.user.next(undefined);
      });
  }

  getUser() {
    return this.user.asObservable();
  }
  logout() {
    this.user.next(undefined);
    localStorage.clear();
    this.http.get(`${environment.apiUrl}/logout`).subscribe();
    window.location.reload();
  }

  updateCompany(company: Company) {
    this.http
      .post<User>(`${environment.apiUrl}/updatecompany`, {
        company: company,
        id: this.user.value.company._id,
      })
      .subscribe((res) => {
        this.user.next(res);
      });
  }
  register(form: FormData) {
    this.http.post<User>(`${environment.apiUrl}/register`, form).subscribe();
  }
}
