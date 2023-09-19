import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FacturaNouaComponent } from './pages/factura-noua/facturanoua.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatInputModule } from '@angular/material/input';
import { DatePipe } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { CompanyComponent } from './pages/company/company.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { ClientFormComponent } from './components/client/client-form/client-form.component';
import { TabelComponent } from './components/tabel/tabel.component';
import { InvoiceDatesComponent } from './components/invoice-details/invoice-number-issue/invoice-dates.component';
import { SearchClientComponent } from './components/client/client-search/client-search.component';
import { MatRippleModule } from '@angular/material/core';
import { CustomInterceptor } from './services/interceptor';
import { SignupComponent } from './components/signup/signup.component';
import { AccountComponent } from './pages/account/account.component';
import { LogoutComponent } from './components/logout/logout.component';
import { SaveExportNewComponent } from './components/save-export-new/save-export-new.component';
import { loggedInGuard } from './guards/loggedIn.guard';
import { InvoiceTotalsComponent } from './components/invoice-totals/invoice-totals.component';
import { ClientControlsComponent } from './components/client/client-controls/client-controls.component';
import { InvoiceTextComponent } from './components/invoice-details/invoice-text/invoice-text.component';
import { InvoicePreferencesComponent } from './components/invoice-details/invoice-preferences/invoice-preferences.component';
import { ExportComponent } from './pages/export/export.component';
import { CommonModule } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/de-BE';
import { InvoicePreviewComponent } from './pages/invoice-preview/invoice-preview.component';
registerLocaleData(localeFr, 'de-BE');

@NgModule({
  declarations: [
    AppComponent,
    FacturaNouaComponent,
    NavigationComponent,
    LoginComponent,
    CompanyComponent,
    ReportsComponent,
    ClientFormComponent,
    TabelComponent,
    InvoiceDatesComponent,
    SearchClientComponent,
    SignupComponent,
    AccountComponent,
    LogoutComponent,
    SaveExportNewComponent,
    InvoiceTotalsComponent,
    ClientControlsComponent,
    InvoiceTextComponent,
    InvoicePreferencesComponent,
    ExportComponent,
    InvoicePreviewComponent,
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
      useClass: CustomInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
