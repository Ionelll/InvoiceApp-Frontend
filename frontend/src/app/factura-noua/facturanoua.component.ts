import { animate, style, transition, trigger } from '@angular/animations';
import {
  AfterViewInit,
  Component,
  OnInit,
  ChangeDetectorRef,
  ViewChildren,
  QueryList,
} from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Company } from '../models/company.model';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs';
import { DatePipe } from '@angular/common';
import { User } from '../models/user.model';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';

@Component({
  selector: 'app-facturanoua',
  templateUrl: './facturanoua.component.html',
  styleUrls: ['./facturanoua.component.scss'],
})
export class FacturaNouaComponent implements OnInit {
  constructor(
    private api: ApiService,
    private datePipe: DatePipe,
    private cd: ChangeDetectorRef
  ) {
    if (window.innerWidth < 890) {
      this.mobile = true;
    }
  }

  //Date variables

  user: User;
  //Observable variables

  client: Company;

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
  currentProvider = this.companies[0];

  //Forms

  //autocomplete variables

  //screen size
  mobile = false;
  logo: string = this.companies[0].logo;
  //remember data

  ngOnInit(): void {
    this.api.user$.subscribe((res) => {
      this.user = res;
    });
  }

  newbill() {}

  print() {
    window.print();
    window.location.reload();
  }
}
