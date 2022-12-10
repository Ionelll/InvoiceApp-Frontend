import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { ApiService } from '../api.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import {map,startWith} from 'rxjs/operators';
import { Client } from '../client.model';


@Component({
  selector: 'app-clienti',
  templateUrl: './clienti.component.html',
  styleUrls: ['./clienti.component.scss']
})
export class ClientiComponent implements OnInit{
options: string[] = [];
searchControl = new FormControl();
newclient:Client
client= new FormGroup({
  nume:new FormControl(''),
  adresa:new FormControl(''),
  telefon:new FormControl(''),
  cui:new FormControl(''),
  email:new FormControl(''),
  website:new FormControl(''),
})
filteredoptions = new Observable<string[]>();

  saveClient(){
    this.newclient=Object.assign(this.client.value)
    this.api.addClient(this.newclient)
  }
  constructor( public api:ApiService){}
ngOnInit(): void {  
  this.api.clientList()
  this.api.clients$.subscribe(res=>{this.options=res})
  this.api.client$.subscribe(res=>{
    this.client.patchValue(res)
}
  )
  this.filteredoptions = this.searchControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
}
private _filter(value: string): string[] {
  const filterValue = value;
  return this.options.filter(option => option.toLowerCase().includes(filterValue.toLowerCase()));
}
 onSearchClient(){
  this.api.searchClient(this.searchControl.value)
 }
}
