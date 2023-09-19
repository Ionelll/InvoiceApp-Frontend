import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription, debounceTime } from 'rxjs';
import { ClientService } from 'src/app/services/invoice-services/client.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-client',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss'],
})
export class ClientFormComponent implements OnInit, OnDestroy {
  showClient = new FormGroup({
    companyName: new FormControl('', Validators.required),
    adress: new FormGroup({
      country: new FormControl('', Validators.required),
      region: new FormControl(''),
      city: new FormControl('', Validators.required),
      street: new FormControl('', Validators.required),
      number: new FormControl('', Validators.required),
      postalCode: new FormControl('', Validators.required),
    }),
    phone: new FormControl('', Validators.required),
    registrationNumber: new FormControl('', Validators.required),
    euid: new FormControl(''),
    email: new FormControl('', Validators.required),
  });
  clientSub = new Subscription();
  isEdit = false;

  constructor(private client: ClientService, private http: HttpClient) {}

  ngOnInit(): void {
    this.showClient.valueChanges.subscribe(() => {
      localStorage.setItem('Client', JSON.stringify(this.showClient.value));
      this.client.formValidation(
        this.showClient.dirty,
        this.showClient.pristine,
        this.showClient.valid
      );
    });

    this.clientSub = this.client.getClient().subscribe((response) => {
      if (response) {
        this.showClient.patchValue(response);
        this.showClient.markAsPristine();
      } else {
        this.showClient.patchValue(JSON.parse(localStorage.getItem('Client')));
      }
    });
  }

  ngOnDestroy(): void {
    this.clientSub.unsubscribe();
  }
}
