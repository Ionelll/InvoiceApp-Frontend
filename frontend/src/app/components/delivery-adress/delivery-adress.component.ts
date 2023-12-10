import { transition, trigger, style, animate } from '@angular/animations';
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Adress } from 'src/app/models/adress.model';
import { deliveryService } from 'src/app/services/invoice-services/delivery.service';
import { InvoiceService } from 'src/app/services/invoice-services/invoice.service';
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
    localStorage.setItem('DeliveryToggle', JSON.stringify(this.deliveryToggle));
    this.deliveryService.setValidation(!this.deliveryToggle);
    if (!this.deliveryToggle) this.invoice.remove_Delivery();
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
