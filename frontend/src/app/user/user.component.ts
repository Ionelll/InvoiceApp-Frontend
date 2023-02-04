import { Component } from '@angular/core';
import { User } from '../models/user.model';
import { Company } from '../models/company.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent {
  saleData = [
    { name: 'Karl Michl Spedition GmbH', value: 105000 },
    { name: 'Company2', value: 55000 },
    { name: 'Company3', value: 15000 },
    { name: 'My PapService24H', value: 150000 },
    { name: 'Company4', value: 25000 },
  ];
  user: User = JSON.parse(localStorage.getItem('User'));
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
}
