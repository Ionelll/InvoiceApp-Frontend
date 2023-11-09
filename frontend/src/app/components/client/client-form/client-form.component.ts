import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
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

  constructor(private client: ClientService) {}

  ngOnInit(): void {
    this.Customer.patchValue(JSON.parse(localStorage.getItem('Client')));
    setTimeout(() => {
      this.client.formValidation(
        this.Customer.dirty,
        this.Customer.pristine,
        this.Customer.valid
      );
    });

    this.Customer.valueChanges.subscribe(() => {
      localStorage.setItem('Client', JSON.stringify(this.Customer.value));
      this.client.formValidation(
        this.Customer.dirty,
        this.Customer.pristine,
        this.Customer.valid
      );
    });

    this.clientSub = this.client.getClient().subscribe((response) => {
      console.log(response);
      this.Customer.patchValue(response);
      this.Customer.markAsPristine();
      setTimeout(() => {
        this.Customer.updateValueAndValidity();
      });
    });
  }
  setCompanyName() {
    this.client.setClientName(
      this.Customer.controls.Party.controls.PartyName.controls.Name.value
    );
  }
  clearForm() {
    this.Customer.reset();
    localStorage.removeItem('ClientId');
    this.client.setClientName(undefined);
  }
  saveCustomer() {
    let clientID = localStorage.getItem('ClientID');
    this.client.saveClient(clientID);
  }
  reloadCustomer() {
    let clientID = localStorage.getItem('ClientId');
    if (clientID && this.Customer.dirty) {
      this.client.reloadClient(clientID);
    } else this.Customer.reset();
  }
  ngOnDestroy(): void {
    this.clientSub.unsubscribe();
  }
}
