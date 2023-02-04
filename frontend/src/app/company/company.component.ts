import { Component, OnInit,OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit,OnDestroy {
constructor(private route:ActivatedRoute){
}
company:string
companySub:Subscription

ngOnInit(): void {
this.companySub=this.route.params.subscribe(res=>{
  this.company=res['id']
})
  
}
ngOnDestroy(){
  this.companySub.unsubscribe()
}

}
