import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Company } from '../models/company.model';
import { environment } from 'src/environment/environment';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private nrfactura = new Subject<string>();
  public nrfactura$ = this.nrfactura.asObservable();
  private user = new BehaviorSubject<User>(undefined);
  public user$ = this.user.asObservable();
  private companies = new Subject<Company[]>();
  public companies$ = this.companies.asObservable();
  constructor(private http: HttpClient, private router: Router) {}

  addClient(form: Company) {
    this.http.post(`${environment.apiUrl}addcompany`, form).subscribe();
  }

  saveFactura(
    clientdata: string,
    tabel: string,
    nrfactura: string,
    datenow: string
  ) {
    this.http
      .post(`${environment.apiUrl}saveinvoice`, {
        clientdata: clientdata,
        tabel: tabel,
        nrfactura: nrfactura,
        datenow: datenow,
      })
      .subscribe();
  }

  getNrFactura() {
    this.http.get<string>('${environment.apiUrl}nrfactura').subscribe((res) => {
      this.nrfactura.next(res);
    });
  }

  getCompanies(userid: string) {
    this.http
      .get<Company[]>(`${environment.apiUrl}/user/getusercompanies/:${userid}`)
      .subscribe((res) => {
        this.companies.next(res);
      });
  }

  getUser() {
    this.user.next(JSON.parse(localStorage.getItem('User')));
  }

  logout() {
    this.user.next(undefined);
    localStorage.removeItem('User');
  }
}
