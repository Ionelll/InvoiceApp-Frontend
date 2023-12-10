import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FacturaNouaComponent } from './pages/invoice/facturanoua.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { AccountComponent } from './pages/account/account.component';
import { loggedInGuard } from './guards/loggedIn.guard';
import { InvoicePreviewComponent } from './pages/invoice-preview/invoice-preview.component';
import { DashboardPageComponent } from './pages/dashboard/dashboard.component';

import { ClientFormComponent } from './components/client/client-form/client-form.component';

import { TabelComponent } from './components/tabel/tabel.component';
import { InvoicePreferencesComponent } from './components/invoice-details/invoice-preferences/invoice-preferences.component';
import { CompanyComponent } from './components/company/company-details/company.component';
import { InvoiceDetails } from './services/invoice-services/details.service';
import { SettingsComponent } from './components/company/settings/settings.component';

const routes: Routes = [
  {
    path: 'invoice',
    component: FacturaNouaComponent,
    children: [
      { path: '', redirectTo: 'client', pathMatch: 'full' },
      { path: 'client', component: ClientFormComponent },
      { path: 'details', component: InvoicePreferencesComponent },
      { path: 'articles', component: TabelComponent },
    ],
  },

  {
    path: 'dashboard',
    component: DashboardPageComponent,
    children: [
      { path: '', redirectTo: 'company', pathMatch: 'full' },
      { path: 'company', component: CompanyComponent },
      {
        path: 'settings',
        component: SettingsComponent,
      },
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
    ],
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
  {
    path: 'invoice-preview',
    component: InvoicePreviewComponent,
  },
  { path: '**', redirectTo: 'invoice', pathMatch: 'full' },
  { path: '', redirectTo: 'invoice', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
