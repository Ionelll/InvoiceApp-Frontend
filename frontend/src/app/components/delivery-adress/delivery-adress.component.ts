import { transition, trigger, style, animate } from '@angular/animations';
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Loader } from '@googlemaps/js-api-loader';
import { environment } from 'src/environment/environment';

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
export class DeliveryAdressComponent implements OnInit, AfterViewInit {
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

  public deliveryToggle = JSON.parse(
    localStorage.getItem('DeliveryToggle') || 'none'
  );
  toggleDelivery() {
    localStorage.setItem('DeliveryToggle', JSON.stringify(this.deliveryToggle));
  }
  @ViewChild('street') street: ElementRef;

  ngOnInit() {
    // this.location.getLocation('cali');
    this.Delivery.valueChanges.subscribe(() => {
      localStorage.setItem('Delivery', JSON.stringify(this.Delivery.value));
    });
    this.Delivery.patchValue(
      JSON.parse(localStorage.getItem('Delivery') || 'none')
    );
  }
  ngAfterViewInit(): void {
    let autocomplete: google.maps.places.Autocomplete;
    const loader = new Loader({
      apiKey: environment.placesKey, //
      version: 'weekly',
      libraries: ['places'],
    });
    loader.importLibrary('places').then((google) => {
      autocomplete = new google.Autocomplete(this.street.nativeElement, {
        fields: ['address_components', 'geometry'],
        types: ['address'],
      });
      autocomplete.addListener('place_changed', () => {
        console.log(autocomplete.getPlace());
      });
    });
  }
}
