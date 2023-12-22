import { transition, trigger, style, animate } from '@angular/animations';
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ModalService } from 'src/app/services/modal.service';
import { deliveryService } from 'src/app/services/invoice-services/delivery.service';
import { InvoiceService } from 'src/app/services/invoice-services/invoice.service';
import { Adress } from 'src/app/models/adress.model';

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
    private deliveryService: deliveryService,
    private invoice: InvoiceService,
    private datePipe: DatePipe
  ) {}
  deliverydate = new FormGroup({
    ActualDeliveryDate: new FormControl(
      this.datePipe.transform(new Date(), 'yyyy-MM-dd'),
      [Validators.required]
    ),
  });

  adress: Adress;
  adressValid: boolean = false;
  public deliveryToggle: boolean;
  ngOnInit(): void {
    this.deliveryToggle =
      JSON.parse(localStorage.getItem('DeliveryToggle')) || false;
    this.adress = JSON.parse(localStorage.getItem('DeliveryAdress'));
    if (!this.deliveryToggle) this.deliveryService.setValidation(true);
    else
      this.deliveryService.setValidation(
        this.adress && this.deliverydate.valid
      );
    this.modalService.subscribeCloseModal().subscribe((res) => {
      if (res) {
        this.adress = res.PostalAdress;
        this.adressValid = true;
        localStorage.setItem(
          'DeliveryAdress',
          JSON.stringify(res.PostalAdress)
        );

        if (this.deliverydate.valid) {
          this.deliveryService.setValidation(true);
          this.invoice.set_Delivery(
            this.adress,
            this.deliverydate.controls.ActualDeliveryDate.value
          );
        }
      }
    });
    this.deliverydate.valueChanges.subscribe(() => {
      if (this.adressValid && this.deliverydate.valid) {
        this.deliveryService.setValidation(true);
        this.invoice.set_Delivery(
          this.adress,
          this.deliverydate.controls.ActualDeliveryDate.value
        );
      }
    });
  }

  toggleDelivery() {
    if (this.deliveryToggle) {
      this.invoice.set_Delivery(
        this.adress,
        this.deliverydate.controls.ActualDeliveryDate.value
      );

      this.deliveryService.setValidation(
        this.adress && this.deliverydate.valid
      );
    } else {
      this.invoice.remove_Delivery();
      this.deliveryService.setValidation(true);
    }
    localStorage.setItem('DeliveryToggle', JSON.stringify(this.deliveryToggle));
  }
  openModal() {
    this.modalService.openModal('DeliveryAdress', this.adress);
  }
  setDate() {
    localStorage.setItem(
      'DeliveryDate',
      JSON.stringify(this.deliverydate.controls.ActualDeliveryDate)
    );
  }
}
