import { trigger,transition,animate,style } from '@angular/animations';
import { Component } from '@angular/core';
import { Company } from '../models/company.model';
import { User } from '../models/user.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations:[
    trigger('enterleave',[
      transition(':leave',[
      animate('300ms', style({transform:'translateY(-100%)'}))
    ]),
      transition(':enter',[
        style({transform:'translateY(-100%)'}),
        animate("300ms")
        
      ])
  ])
  ]
})
export class DashboardComponent {
  toggle=false

  user:User={_id:'sdfdf',name:'Ioan Popescu',photo:'assets/profile.png',email:'example@gmail.com'}
  companies:Company[]=[{_id:'adasdas',nume:'Company1',adresa:[],telefon:'2315131',cui:'dsfsdf',email:'skdjfhkshdflk@gmail.com',website:'asdhghag.com',bank:[]},
  {_id:'adasdas',nume:'Company2',adresa:[],telefon:'2315131',cui:'dsfsdf',email:'skdjfhkshdflk@gmail.com',website:'asdhghag.com',bank:[]},
  {_id:'adasdas',nume:'Company3',adresa:[],telefon:'2315131',cui:'dsfsdf',email:'skdjfhkshdflk@gmail.com',website:'asdhghag.com',bank:[]},
  {_id:'adasdas',nume:'Company3',adresa:[],telefon:'2315131',cui:'dsfsdf',email:'skdjfhkshdflk@gmail.com',website:'asdhghag.com',bank:[]},
  {_id:'adasdas',nume:'Company3',adresa:[],telefon:'2315131',cui:'dsfsdf',email:'skdjfhkshdflk@gmail.com',website:'asdhghag.com',bank:[]},
  {_id:'adasdas',nume:'Company3',adresa:[],telefon:'2315131',cui:'dsfsdf',email:'skdjfhkshdflk@gmail.com',website:'asdhghag.com',bank:[]},
  {_id:'adasdas',nume:'Company3',adresa:[],telefon:'2315131',cui:'dsfsdf',email:'skdjfhkshdflk@gmail.com',website:'asdhghag.com',bank:[]},
  {_id:'adasdas',nume:'Company3',adresa:[],telefon:'2315131',cui:'dsfsdf',email:'skdjfhkshdflk@gmail.com',website:'asdhghag.com',bank:[]},
  {_id:'adasdas',nume:'Company3',adresa:[],telefon:'2315131',cui:'dsfsdf',email:'skdjfhkshdflk@gmail.com',website:'asdhghag.com',bank:[]},
  {_id:'adasdas',nume:'Company3',adresa:[],telefon:'2315131',cui:'dsfsdf',email:'skdjfhkshdflk@gmail.com',website:'asdhghag.com',bank:[]},

]
changetoggle(){
  this.toggle=!this.toggle
}
}

