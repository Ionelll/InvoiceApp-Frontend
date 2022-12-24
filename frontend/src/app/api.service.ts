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
            this.http.get<Object>('http://localhost:3000/api/clients').subscribe(res=>{
                  let x=Object.values(res)                  
                  this.clients.next(x[1].map(z=>{return z.nume}))
                  console.log()
            })
      }
      searchClient(clientname:string){
            this.http.get<{count:number,result:Company}>(`http://localhost:3000/api/client/${clientname}`).subscribe(res=>{
                  this.client.next(res.result[0])
            })
      }
      getNrFactura(){
            this.http.get<string>('http://localhost:3000/api/nrfactura').subscribe(res=>{
                  this.nrfactura.next(res)
            })
      }
      login(form:FormData){
            this.http.post<{message:string,token:string,user:User}>(`${environment.apiUrl}/user/login`,form).subscribe(res=>{
                  localStorage.setItem('token',JSON.stringify(res.token))
                  localStorage.setItem('User',JSON.stringify(res.user))
            })
      }
      register(form:FormData){
            this.http.post<User>(`${environment.apiUrl}/user/register`,{
                  username: 'Ioan Serban cel Viteaz',
                  adresa: 'fdfgh',
                  phone: '032135',
                  cui: '674556465',
                  email: 'asd',
                  website: 'fgdghfgh',
                  password: 'asd',
                  numeFirma: 'hgfdfgdg',
                  }).subscribe()            
      }
}