import { transition, trigger, style, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Adress } from 'src/app/models/adress.model';
import { deliveryService } from 'src/app/services/invoice-services/delivery.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-delivery-adress',
  templateUrl: './delivery-adress.component.html',
  styleUrls: ['./delivery-adress.component.scss'],
  animations: [
    trigger('openClose', [
      transition(':enter', [
        style({ opacity: 0, height: '0' }),

        animate('0.2s', style({ height: '*', opacity: 1 })),
      ]),
      transition(':leave', [
        animate('0.2s', style({ height: '0', opacity: 0 })),
      ]),
    ]),
  ],
})
export class DeliveryAdressComponent implements OnInit {
  constructor(
    private modalService: ModalService,
    private deliveryService: deliveryService
  ) {}
  deliverydate = new FormGroup({
    ActualDeliveryDate: new FormControl('', [Validators.required]),
  });

  adress: Adress;
  adressValid: boolean = false;
  public deliveryToggle: boolean = false;
  ngOnInit(): void {
    this.deliveryService.setValidation(!this.deliveryToggle);
    this.modalService.subscribeCloseModal().subscribe((res) => {
      if (res) {
        this.adress = res.PostalAdress;
        this.adressValid = true;
        localStorage.setItem(
          'DeliveryAdress',
          JSON.stringify(res.PostalAdress)
        );
        if (this.deliverydate.valid) this.deliveryService.setValidation(true);
      }
    });
    this.deliverydate.valueChanges.subscribe(() => {
      if (this.adressValid && this.deliverydate.valid)
        this.deliveryService.setValidation(true);
    });
  }

  toggleDelivery() {
    localStorage.setItem('DeliveryToggle', JSON.stringify(this.deliveryToggle));
    this.deliveryService.setValidation(!this.deliveryToggle);
  }
  openModal() {
    this.modalService.openModal('DeliveryAdress');
  }
  setDate() {
    localStorage.setItem(
      'DeliveryDate',
      JSON.stringify(this.deliverydate.controls.ActualDeliveryDate)
    );
  }
}
