import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FacturaNouaComponent } from './pages/invoice/facturanoua.component';
import { NavbarComponent } from './components/navigation/navbar/navbar.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatInputModule } from '@angular/material/input';
import { DatePipe } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { CompanyComponent } from './components/company/company-details/company.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { ClientFormComponent } from './components/client/client-form/client-form.component';
import { TabelComponent } from './components/tabel/tabel.component';
import { InvoiceDatesComponent } from './components/invoice-details/invoice-number-issue/invoice-dates.component';
import { SearchClientComponent } from './components/client/client-search/client-search.component';
import { MatRippleModule } from '@angular/material/core';
import { TokenInterceptor } from './services/interceptors/token.interceptor';
import { SignupComponent } from './components/signup/signup.component';
import { AccountComponent } from './pages/account/account.component';
import { loggedInGuard } from './guards/loggedIn.guard';
import { InvoiceTotalsComponent } from './components/invoice-totals/invoice-totals.component';
import { InvoicePreferencesComponent } from './components/invoice-details/invoice-preferences/invoice-preferences.component';
import { CommonModule } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/de-BE';
import { InvoicePreviewComponent } from './pages/invoice-preview/invoice-preview.component';
import { DashboardPageComponent } from './pages/dashboard/dashboard.component';
import { SettingsComponent } from './components/company/settings/settings.component';
import { ToolbarComponent } from './components/navigation/toolbar/toolbar.component';
import { SidebarComponent } from './components/navigation/sidebar/sidebar.component';
import { DeliveryAdressComponent } from './components/delivery-adress/delivery-adress.component';
import { ModalComponent } from './components/modal/modal.component';
import { CurrencyPipe } from '@angular/common';
import { ErrorInterceptor } from './services/interceptors/error.interceptor';
import { SavedInvoicesComponent } from './components/saved-invoices/saved-invoices.component';

registerLocaleData(localeFr, 'de-BE');

@NgModule({
  declarations: [
    AppComponent,
    FacturaNouaComponent,
    NavbarComponent,
    LoginComponent,
    CompanyComponent,
    ReportsComponent,
    ClientFormComponent,
    TabelComponent,
    InvoiceDatesComponent,
    SearchClientComponent,
    SignupComponent,
    AccountComponent,
    InvoiceTotalsComponent,
    InvoicePreferencesComponent,
    InvoicePreviewComponent,
    DashboardPageComponent,
    SettingsComponent,
    ToolbarComponent,
    SidebarComponent,
    DeliveryAdressComponent,
    ModalComponent,
    SavedInvoicesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatAutocompleteModule,
    MatIconModule,
    MatButtonModule,
    TextFieldModule,
    MatInputModule,
    MatRippleModule,
    CommonModule,
  ],
  providers: [
    loggedInGuard,
    { provide: LOCALE_ID, useValue: 'de-BE' },
    DatePipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,

      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    CurrencyPipe,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
