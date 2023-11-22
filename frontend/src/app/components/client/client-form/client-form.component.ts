import { Component, OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription, debounceTime } from 'rxjs';
import { ClientService } from 'src/app/services/invoice-services/client.service';

@Component({
  selector: 'app-client',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss'],
})
export class ClientFormComponent implements OnInit, OnDestroy {
  Customer = new FormGroup({
    Party: new FormGroup({
      PartyName: new FormGroup({
        Name: new FormControl('', Validators.required),
      }),
      EndpointID: new FormControl(''),
      IndustryClasificationCode: new FormControl(''),
      PartyIdentification: new FormGroup({
        ID: new FormControl('', Validators.required),
      }),
      PostalAdress: new FormGroup({
        PostBox: new FormControl(''),
        StreetName: new FormControl('', Validators.required),
        BuildingNumber: new FormControl(''),
        CityName: new FormControl('', Validators.required),
        PostalZone: new FormControl(''),
        CountrySubentity: new FormControl(''),
        Country: new FormGroup({
          IdentificationCode: new FormControl(''),
        }),
      }),
      Contact: new FormGroup({
        Name: new FormControl(''),
        Telephone: new FormControl(''),
        ElectronicMail: new FormControl(''),
      }),
    }),
    BuyerReference: new FormControl(''),
  });

  clientSub = new Subscription();

  constructor(private client: ClientService, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.Customer.patchValue(
      JSON.parse(localStorage.getItem('AccountingCustomerParty'))
    );
    setTimeout(() => {
      this.client.formValidation(
        this.Customer.dirty,
        this.Customer.pristine,
        this.Customer.valid
      );
    });

    this.Customer.valueChanges.pipe(debounceTime(500)).subscribe(() => {
      localStorage.setItem(
        'AccountingCustomerPary',
        JSON.stringify(this.Customer.value)
      );
      this.client.formValidation(
        this.Customer.dirty,
        this.Customer.pristine,
        this.Customer.valid
      );
      this.client.setClient(
        JSON.parse(localStorage.getItem('AccountingCustomerParty'))
      );
    });

    this.clientSub = this.client.getClient().subscribe((response) => {
      this.Customer.patchValue(response);
      this.Customer.markAsPristine();
      setTimeout(() => {
        this.Customer.updateValueAndValidity();
      });
    });
    this.cd.detectChanges();
  }

  clearForm() {
    this.Customer.reset();
    localStorage.removeItem('AccountingCustomerParty');
  }
  saveCustomer() {
    let clientID = localStorage.getItem('ClientID');
    this.client.saveClient(clientID);
  }
  reloadCustomer() {
    let clientID = localStorage.getItem('ClientId');
    if (clientID) {
      this.client.reloadClient(clientID);
    } else this.Customer.reset();
  }
  ngOnDestroy(): void {
    this.clientSub.unsubscribe();
  }
}
