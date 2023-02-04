import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FacturaNouaComponent } from './factura-noua/facturanoua.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CompanyComponent } from './company/company.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {path:'',component : FacturaNouaComponent},
  {path:'dashboard',component:DashboardComponent,children:[
    {path:'user/:username',component:UserComponent},
    {path:'company/:id',component:CompanyComponent},
    {path:'login',component:LoginComponent},    
  ]},
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
