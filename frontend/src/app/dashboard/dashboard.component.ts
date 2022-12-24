import { CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Company } from '../models/company.model';
import { User } from '../models/user.model';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  toggle=false
  company:string
  companyName='Companies'

  constructor(public route:ActivatedRoute){
    console.log(this.route.snapshot.url[0].path)
  }

  user:User=JSON.parse(localStorage.getItem('User'))
  companies:Company[]=[
  {_id:'adasdas',nume:'Karl Michl Spedition GmbH',adresa:[],telefon:'2315131',cui:'dsfsdf',email:'skdjfhkshdflk@gmail.com',website:'asdhghag.com'},
  {_id:'adasdas',nume:'Company2',adresa:[],telefon:'2315131',cui:'dsfsdf',email:'skdjfhkshdflk@gmail.com',website:'asdhghag.com'},
  {_id:'adasdas',nume:'Company3',adresa:[],telefon:'2315131',cui:'dsfsdf',email:'skdjfhkshdflk@gmail.com',website:'asdhghag.com'},
  {_id:'adasdas',nume:'My PapService24H',adresa:[],telefon:'2315131',cui:'dsfsdf',email:'skdjfhkshdflk@gmail.com',website:'asdhghag.com'}
]
changetoggle(){
  this.toggle=!this.toggle
}

changeCompany(name:string){

      this.companyName=name
 this.toggle=false
}
}

