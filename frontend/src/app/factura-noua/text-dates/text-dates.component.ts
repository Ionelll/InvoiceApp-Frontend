import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-text-dates',
  templateUrl: './text-dates.component.html',
  styleUrls: ['./text-dates.component.scss']
})
export class TextDatesComponent implements OnInit {

  constructor(private datePipe:DatePipe){}

  nrfactura:string
  emisa=this.datePipe.transform(new Date(), 'yyyy-MM-dd')
  scadentza=30  
  scadenta=this.datePipe.transform(new Date().setDate(new Date().getDate()+this.scadentza), 'yyyy-MM-dd') 
  remembernrfactura:string

  facturanr:string  
  adresareheader:string
  adresaretext:string

  saveData(){  
    localStorage.setItem('AdresareHeader',document.getElementById('adresareheader').innerHTML)
    localStorage.setItem('AdresareText',document.getElementById('adresaretext').innerHTML)
  }  
  savenrfactura(){
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

  ngOnInit(): void {
    this.remembernrfactura=localStorage.getItem('nrFactura') 
    if(this.remembernrfactura!=''){
      this.nrfactura=this.remembernrfactura
    }
  }
  ngAfterViewInit(){
   
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
}
