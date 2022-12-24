import { Component } from '@angular/core';
import { User } from '../models/user.model';
import { Company } from '../models/company.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  saleData = [
    { name: "Karl Michl Spedition GmbH", value: 105000 },
    { name: "Company2", value: 55000 },
    { name: "Company3", value: 15000 },
    { name: "My PapService24H", value: 150000 }
  ];
  user:User=JSON.parse( localStorage.getItem('User'))
  companies:Company[]=[
  {_id:'adasdas',nume:'Karl Michl Spedition GmbH',adresa:[],telefon:'2315131',cui:'dsfsdf',email:'skdjfhkshdflk@gmail.com',website:'asdhghag.com'},
  {_id:'adasdas',nume:'Company2',adresa:[],telefon:'2315131',cui:'dsfsdf',email:'skdjfhkshdflk@gmail.com',website:'asdhghag.com'},
  {_id:'adasdas',nume:'Company3',adresa:[],telefon:'2315131',cui:'dsfsdf',email:'skdjfhkshdflk@gmail.com',website:'asdhghag.com'},
  {_id:'adasdas',nume:'My PapService24H',adresa:[],telefon:'2315131',cui:'dsfsdf',email:'skdjfhkshdflk@gmail.com',website:'asdhghag.com'}
  ]
}

