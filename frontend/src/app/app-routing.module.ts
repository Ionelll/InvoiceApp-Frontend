import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientiComponent } from './clienti/clienti.component';
import { FacturaNouaComponent } from './factura-noua/facturanoua.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CompanyComponent } from './company/company.component';

const routes: Routes = [
  {path:'',component : FacturaNouaComponent},
  {path:'dashboard',component:DashboardComponent,children:[
    {path:'company/:id',component:CompanyComponent}
  ]},
  {path:'clienti',component:ClientiComponent},
  {path:'login',component:LoginComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
