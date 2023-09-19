import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FacturaNouaComponent } from './pages/factura-noua/facturanoua.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { CompanyComponent } from './pages/company/company.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { AccountComponent } from './pages/account/account.component';
import { loggedInGuard } from './guards/loggedIn.guard';

const routes: Routes = [
  {
    path: 'invoice',
    component: FacturaNouaComponent,
  },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: 'company',
    component: CompanyComponent,
  },
  {
    path: 'reports',
    component: ReportsComponent,
    canActivate: [loggedInGuard],
  },
  {
    path: 'account',
    component: AccountComponent,
  },
  { path: '**', redirectTo: 'invoice', pathMatch: 'full' },
  { path: '', redirectTo: 'invoice', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
