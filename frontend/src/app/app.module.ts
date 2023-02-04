import {  NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from'@angular/platform-browser/animations';
import { FacturaNouaComponent } from './factura-noua/facturanoua.component';
import { NavigationComponent } from './navigation/navigation.component';
import { HttpClientModule } from '@angular/common/http';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatIconModule} from'@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {TextFieldModule} from '@angular/cdk/text-field'
import {MatInputModule} from '@angular/material/input'
import { DatePipe } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CompanyComponent } from './company/company.component';
import { NgxChartsModule }from '@swimlane/ngx-charts';
import { UserComponent } from './user/user.component';
import { ClientComponent } from './factura-noua/client/client.component';
import { ProviderComponent } from './factura-noua/provider/provider.component';
import { TabelComponent } from './factura-noua/tabel/tabel.component';
import { TextDatesComponent } from './factura-noua/text-dates/text-dates.component';
import { SearchCompanyComponent } from './search-company/search-company.component';




@NgModule({
  declarations: [
    AppComponent,
    FacturaNouaComponent,
    NavigationComponent,
    LoginComponent,
    DashboardComponent,
    CompanyComponent,
    UserComponent,
    ClientComponent,
    ProviderComponent,
    TabelComponent,
    TextDatesComponent,
    SearchCompanyComponent,
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
    NgxChartsModule
  ],
  providers: [DatePipe,],
  bootstrap: [AppComponent]
})
export class AppModule { }
