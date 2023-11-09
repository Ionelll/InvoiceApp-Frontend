import { transition, trigger, style, animate } from '@angular/animations';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { LocationService } from 'src/app/services/location.service';

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
  constructor(private location: LocationService) {}
  Delivery = new FormGroup({
    ActualDeliveryDate: new FormControl(Date, Validators.required),
    DeliveryLocation: new FormGroup({
      Adress: new FormGroup({
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
    }),
  });

  public deliveryToggle = JSON.parse(localStorage.getItem('DeliveryToggle'));
  toggleDelivery() {
    localStorage.setItem('DeliveryToggle', JSON.stringify(this.deliveryToggle));
  }
  @ViewChild('street') street: ElementRef;
  private getPlaceAutocomplete() {
    const autocomplete = new google.maps.places.Autocomplete(
      this.street.nativeElement,
      {
        componentRestrictions: { country: 'US' },
        types: ['adress'], // 'establishment' / 'address' / 'geocode'
      }
    );
    google.maps.event.addListener(autocomplete, 'place_changed', () => {
      const place = autocomplete.getPlace();
      this.invokeEvent(place);
    });
  }

  invokeEvent(place: Object) {
    console.log(place);
  }

  ngOnInit() {
    this.getPlaceAutocomplete();
    this.Delivery.valueChanges.subscribe(() => {
      localStorage.setItem('Delivery', JSON.stringify(this.Delivery.value));
    });
    this.Delivery.patchValue(JSON.parse(localStorage.getItem('Delivery')));
  }
}
