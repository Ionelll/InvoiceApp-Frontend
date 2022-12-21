import { Injectable } from "@angular/core"
import {  Subject } from "rxjs"
import { HttpClient } from "@angular/common/http"
import { Company } from "./models/company.model"
import { NgForm } from "@angular/forms"
import { environment } from "src/environment/environment"
import { User } from "./models/user.model"


@Injectable({providedIn: 'root'})
export class ApiService{
      private clients=new Subject<string[]>()
      public clients$=this.clients.asObservable()
      private client=new Subject<Company>()
      public client$= this.client.asObservable()
      private nrfactura= new Subject<string>()
      public nrfactura$ =this.nrfactura.asObservable()
      constructor(private http: HttpClient){}
      
      addClient(form:Company){
            this.http.post('http://localhost:3000/api/addcompany',form).subscribe()
      }
      saveFactura(clientdata:string,tabel:string,nrfactura:string,datenow:string){
            this.http.post('http://localhost:3000/api/saveinvoice',{clientdata:clientdata,tabel:tabel,nrfactura:nrfactura,datenow:datenow}).subscribe()
      }
      clientList(){
            this.http.get<string[]>('http://localhost:3000/api/companyautocomplete').subscribe(res=>{
                  this.clients.next(res)
            })
      }
      searchClient(clientname:string){
            this.http.get<Company>(`http://localhost:3000/api/searchcompany/${clientname}`).subscribe(res=>{
                  this.client.next(res[0])
            })
      }
      getNrFactura(){
            this.http.get<string>('http://localhost:3000/api/nrfactura').subscribe(res=>{
                  this.nrfactura.next(res)
            })
      }
      login(form:NgForm){
            this.http.post<User>(`${environment.apiUrl}/login`,form).subscribe(res=>{
                  localStorage.setItem('User',JSON.stringify(res))
            })
      }
}