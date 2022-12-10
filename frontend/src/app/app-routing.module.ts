import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientiComponent } from './clienti/clienti.component';
import { FacturaNouaComponent } from './factura-noua/facturanoua.component';
import { FacturiComponent } from './facturi/facturi.component';

const routes: Routes = [
  {path:'',component : FacturaNouaComponent},
  {path:'facturi',component:FacturiComponent},
  {path:'clienti',component:ClientiComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
