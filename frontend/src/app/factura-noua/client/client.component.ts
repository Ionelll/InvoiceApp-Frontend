import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { Adresa } from 'src/app/models/adresa.model';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
})
export class ClientComponent implements OnInit {
  constructor(private api: ApiService) {}

  clientdata: {
    name: string;
    adresa: Adresa;
    phone: string;
    cui: string;
    email: string;
  };

  showclient = new FormGroup({
    name: new FormControl(''),
    adresa: new FormGroup({
      country: new FormControl(''),
      region: new FormControl(''),
      city: new FormControl(''),
      street: new FormControl(''),
      number: new FormControl(''),
      postalCode: new FormControl(''),
    }),
    phone: new FormControl(''),
    cui: new FormControl(''),
    email: new FormControl(''),
  });

  show = true;
  ngOnInit(): void {
    this.clientdata = JSON.parse(localStorage.getItem('ClientData'));
    if (this.clientdata) {
      this.showclient.setValue(this.clientdata);
    }
    this.showclient.valueChanges.subscribe(() => {
      localStorage.setItem('ClientData', JSON.stringify(this.showclient.value));
    });

    this.api.getClient().subscribe((res) => {
      this.showclient.patchValue(res);
    });
  }
}
