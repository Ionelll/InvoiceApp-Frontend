import { animate, query, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component,OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ApiService } from '../api.service';
import { Company } from '../models/company.model';
import { Observable } from 'rxjs';
import { startWith,map } from 'rxjs';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-facturanoua',
  templateUrl: './facturanoua.component.html',
  styleUrls: ['./facturanoua.component.scss'],
  animations:[
    trigger('enterleave',[
      transition(':leave',[
      animate('150ms', style({height:0,overflow:'hidden',opacity:0}))
    ]),
      transition(':enter',[
        style({transform:'translateY(-100%)',opacity:0,overflow:'hidden'}),
        animate("200ms")
        
      ])
  ])
   ]
 })
export class FacturaNouaComponent implements OnInit, AfterViewInit  {
  constructor(public api:ApiService,private datePipe:DatePipe){
    if(window.innerWidth<890){
      this.mobile=true      
    }
  }
  //Date variables
  scadentza=30
  emisa=this.datePipe.transform(new Date(), 'yyyy-MM-dd')
  scadenta=this.datePipe.transform(new Date().setDate(new Date().getDate()+this.scadentza), 'yyyy-MM-dd') 
  animif=true
  loggedin=false
  //Observable variables
  nrfactura:string
  client:Company
  mwst='19'
  //Forms
  tabel= new FormGroup({
    array:new FormArray([
      new FormGroup({
        articol: new FormControl(''),
        bucati:new FormControl(''),
        pret:new FormControl(''),
      })
    ])

  })
  showclient=new FormGroup({
    nume:new FormControl(''),
    adresa:new FormControl([]),
    telefon:new FormControl(''),
    cui:new FormControl(''),
    email:new FormControl('')
  })
  searchControl = new FormControl()
  //autocomplete variables
  options: string[] = [];
  options2=[]
  filteredoptions = new Observable<string[]>()
  filteredoptions2:Observable<string[]>[]=[]

  private _filter(value: string): string[] {
    if(value.length>2){
    const filterValue = value;
    return this.options.filter(option => option.toLowerCase().includes(filterValue.toLowerCase()));
    }
    else return []
  }
  private _filter2(value: string): string[] {
    if(value.length>2){
    const filterValue = value;
    return this.options2.filter(option => option.toLowerCase().includes(filterValue.toLowerCase()));
    }
    else return []
  }
  //screen size
  mobile=false
  logo="assets/logo.png"
  //remember data
  clientdata:{nume:string,adresa:string[],telefon:string,cui:string,email:string}
  facturanr:string
  adresareheader:string
  adresaretext:string
  remembertable:[{articol:string,bucati:string,pret:string}]
  remembernrfactura:string

  ngOnInit(): void {   
    this.remembernrfactura=localStorage.getItem('nrFactura') 
    if(this.remembernrfactura!=''){
      this.nrfactura=this.remembernrfactura
    }
    this.manageAutocompleteInArray(0)
    this.remembertable=JSON.parse(localStorage.getItem('TableValues'))
    if(this.remembertable){
      this.remembertable.forEach((item,index)=>{
        if(index===0){
        this.tabel.controls.array.controls[index].setValue({articol:item.articol,bucati:item.bucati,pret:item.pret})
      }
        else{
          this.tabel.controls.array.push(new FormGroup({articol: new FormControl(item.articol),bucati:new FormControl(item.bucati),pret:new FormControl(item.pret)}))
        }}
      )
    }
    this.clientdata = JSON.parse(localStorage.getItem('ClientData'))
    if(this.clientdata){
      this.showclient.setValue(this.clientdata)
  }
    this.showclient.valueChanges.subscribe(()=>{
      localStorage.setItem('ClientData',JSON.stringify(this.showclient.value))
    })
   
    this.tabel.controls.array.valueChanges.subscribe(()=>{
      localStorage.setItem('TableValues',JSON.stringify( this.tabel.controls.array.value))
    })
    this.api.clientList()
    this.api.clients$.subscribe(res=>{this.options=res})
    this.api.client$.subscribe(res=>{
      this.showclient.patchValue(res)
  }
    )
    // this.api.nrfactura$.subscribe(res=>{this.nrfactura=res})
    this.filteredoptions = this.searchControl.valueChanges
        .pipe(
          startWith(''),
          map(value => this._filter(value))
        );
  }

ngAfterViewInit(){
  this.animif=false
  this.facturanr=localStorage.getItem('FacturaNr')
  if(this.facturanr){
    this.nrfactura=this.facturanr
  }
  this.adresareheader=localStorage.getItem('AdresareHeader')
  if(this.adresareheader){
    document.getElementById('adresareheader').innerHTML=this.adresareheader
  }
  this.adresaretext=localStorage.getItem('AdresareText')
  if(this.adresaretext){
    document.getElementById('adresaretext').innerHTML=this.adresaretext
  }
}

currencytransform(value:string,i:number){
  console.log(this.tabel.controls.array.controls[i].get('pret').value)
}

savenrfactura(){
  localStorage.setItem('nrFactura',this.nrfactura)
}

manageAutocompleteInArray(i:number){
  this.filteredoptions2[i]=this.tabel.controls.array.controls[i].controls.articol.valueChanges.pipe(
    startWith(''),
    map((value:string)=>{return this._filter2(value)})
  )
}
newbill(){
  while(this.tabel.controls.array.length>1){
    this.tabel.controls.array.removeAt(this.tabel.controls.array.length-1)
  }
  
  
  this.tabel.controls.array.setValue([{articol:'',bucati:'',pret:''}])
  localStorage.removeItem('TabelValues')
  this.showclient.reset()
  localStorage.clear()
  this.nrfactura=(parseInt(this.nrfactura)+1).toString()
  localStorage.setItem('nrFactura',this.nrfactura)
}
autodate(){
  let date1=new Date()
  date1.setFullYear(parseInt(this.emisa.substring(0,4)))
  date1.setMonth(parseInt(this.emisa.substring(5,7))-1)
  date1.setDate(parseInt(this.emisa.substring(8,10)))
  date1.setDate(date1.getDate()+this.scadentza)
  this.scadenta=this.datePipe.transform(date1, 'yyyy-MM-dd')
}
addInput(){
 this.tabel.controls.array.push(new FormGroup({articol: new FormControl(''),bucati:new FormControl(''),pret:new FormControl('')}))
 this.manageAutocompleteInArray(this.tabel.controls.array.length-1)
}

suma(i:number){
  return parseFloat(this.tabel.controls.array.controls[i].controls.bucati.value)*parseFloat(this.tabel.controls.array.controls[i].controls.pret.value)
}
 getNetto(){
  let z=0
  this.tabel.controls.array.controls.forEach(item => {
    z+=parseFloat(item.value.bucati)*parseFloat(item.value.pret)||0
  });
  return z.toFixed(2)
 }
getTva(){

  return (parseFloat(this.getNetto())*parseInt(this.mwst)/100 || 0).toFixed(2)
}

getTotal(){
  return (parseFloat(this.getNetto())+parseFloat(this.getTva())).toFixed(2)
}
removeInput(i:number){
if(this.tabel.controls.array.length>1){
  this.tabel.controls.array.removeAt(i)
}
else{
  this.tabel.controls.array.setValue([{articol:'',bucati:'',pret:''}])
  localStorage.removeItem('TabelValues')
}
}
exportPdf(){
  this.api.saveFactura(JSON.stringify( this.showclient.value),JSON.stringify(this.tabel.controls.array.value),this.nrfactura,this.emisa)
  window.print()
  
}
onSearchClient(){
  this.api.searchClient(this.searchControl.value)
 }
 
 saveData(){  
  localStorage.setItem('AdresareHeader',document.getElementById('adresareheader').innerHTML)
  localStorage.setItem('AdresareText',document.getElementById('adresaretext').innerHTML)
  let x:string[]=[]
}  
}