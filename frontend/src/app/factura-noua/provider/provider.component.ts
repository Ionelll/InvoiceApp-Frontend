import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Company } from 'src/app/models/company.model';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-provider',
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.scss'],
})
export class ProviderComponent implements OnInit {
  constructor(private api: ApiService) {}
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
  user: User;
  currentProvider: Company;

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('User'));
    this.currentProvider =
      this.companies[parseInt(localStorage.getItem('CurrentProvider'))];
    // this.api.companies$.subscribe(res=>{
    //   this.companies=res
    //   this.currentProvider=this.companies[0]
    // })
  }
  changeProvider(selected: string) {
    this.currentProvider = this.companies.find((x) => x.name == selected);
    localStorage.setItem(
      'CurrentProvider',
      this.companies.findIndex((x) => x.name == selected).toString()
    );
  }
}
