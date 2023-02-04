import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from '../services/api.service';
import { Company } from '../models/company.model';
import { Adresa } from '../models/adresa.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  toggle = false;
  company: string;
  userSub: Subscription;

  constructor(public route: ActivatedRoute, private api: ApiService) {}

  user: { username: string; email: string };

  companies: Company[] = [
    {
      _id: 'adasdas',
      name: 'Karl Michl Spedition GmbH',
      logo: 'assets/logo5.png',
      adresa: {
        country: 'Romania',
        region: 'Sibiu',
        city: 'Sibiu',
        street: 'Turnisor',
        number: '108',
        postalCode: '123534',
      },
      phone: '2315131',
      mobile: '21231513',
      registrationNumber: 'dsfsdf',
      email: 'skdjfhkshdflk@gmail.com',
      web: 'asdhghag.com',
    },
    {
      _id: 'adasdas',
      name: 'Company2',
      adresa: {
        country: 'Romania',
        region: 'Sibiu',
        city: 'Sibiu',
        street: 'Turnisor',
        number: '108',
        postalCode: '123534',
      },
      logo: 'assets/logo3.jpg',
      phone: '2315131',
      registrationNumber: 'dsfsdf',
      email: 'skdjfhkshdflk@gmail.com',
      web: 'asdhghag.com',
    },
    {
      _id: 'adasdas',
      name: 'Company3',
      adresa: {
        country: 'Romania',
        region: 'Sibiu',
        city: 'Sibiu',
        street: 'Turnisor',
        number: '108',
        postalCode: '123534',
      },
      logo: 'assets/logo2.png',
      phone: '2315131',
      registrationNumber: 'dsfsdf',
      email: 'skdjfhkshdflk@gmail.com',
      web: 'asdhghag.com',
    },
    {
      _id: 'adasdas',
      name: 'My PapService24H',
      logo: 'assets/logo.png',
      adresa: {
        country: 'Romania',
        region: 'Sibiu',
        city: 'Sibiu',
        street: 'Turnisor',
        number: '108',
        postalCode: '123534',
      },
      phone: '2315131',
      registrationNumber: 'dsfsdf',
      email: 'skdjfhkshdflk@gmail.com',
      web: 'asdhghag.com',
    },
  ];
  ngOnInit(): void {
    this.userSub = this.api.user$.subscribe((res) => (this.user = res));
  }
  logout() {
    this.api.logout();
  }
  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
