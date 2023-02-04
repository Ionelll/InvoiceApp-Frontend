import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Company } from '../models/company.model';
import { environment } from 'src/environment/environment';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private clients = new Subject<string[]>();
  public clients$ = this.clients.asObservable();
  public client = new BehaviorSubject<Company>(undefined);
  private nrfactura = new Subject<string>();
  public nrfactura$ = this.nrfactura.asObservable();
  private user = new BehaviorSubject<User>(undefined);
  public user$ = this.user.asObservable();
  private companies = new Subject<Company[]>();
  public companies$ = this.companies.asObservable();
  constructor(private http: HttpClient, private router: Router) {}

  addClient(form: Company) {
    this.http.post('http://localhost:3000/api/addcompany', form).subscribe();
  }

  saveFactura(
    clientdata: string,
    tabel: string,
    nrfactura: string,
    datenow: string
  ) {
    this.http
      .post('http://localhost:3000/api/saveinvoice', {
        clientdata: clientdata,
        tabel: tabel,
        nrfactura: nrfactura,
        datenow: datenow,
      })
      .subscribe();
  }

  clientList() {
    this.http
      .get<{ count: number; result: Company[] }>(
        'http://localhost:3000/api/clients'
      )
      .subscribe((res) => {
        let x = [''];
        res.result.forEach((item) => {
          x.push(item.name);
        });
        this.clients.next(x);
      });
  }

  searchClient(clientname: string) {
    this.http
      .get<{ count: number; result: Company }>(
        `http://localhost:3000/api/client/${clientname}`
      )
      .subscribe((res) => {
        this.client.next(res.result);
      });
  }
  getClient() {
    return this.client.asObservable();
  }

  getNrFactura() {
    this.http
      .get<string>('http://localhost:3000/api/nrfactura')
      .subscribe((res) => {
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

  login(form: FormData) {
    this.http
      .post<{ message: string; token: string; user: User }>(
        `${environment.apiUrl}/user/login`,
        form
      )
      .subscribe((res) => {
        localStorage.setItem(
          'User',
          JSON.stringify({ username: res.user.username, email: res.user.email })
        );
        this.getUser();
        this.router.navigateByUrl('dashboard/user/' + res.user.username);
      });
  }
  getUser() {
    this.user.next(JSON.parse(localStorage.getItem('User')));
  }

  logout() {
    this.user.next(undefined);
    localStorage.removeItem('User');
  }

  register(form: FormData) {
    this.http
      .post<User>(`${environment.apiUrl}/user/register`, {
        username: 'Ioan Serban cel Viteaz',
        adresa: 'fdfgh',
        phone: '032135',
        cui: '674556465',
        email: 'asd',
        website: 'fgdghfgh',
        password: 'asd',
        numeFirma: 'hgfdfgdg',
      })
      .subscribe();
  }
}
