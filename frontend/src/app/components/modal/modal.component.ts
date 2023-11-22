import {
  Component,
  ViewChild,
  ElementRef,
  OnInit,
  OnDestroy,
  AfterViewInit,
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Loader } from '@googlemaps/js-api-loader';
import { ModalService } from 'src/app/services/modal.service';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent implements OnInit, OnDestroy, AfterViewInit {
  constructor(private modalService: ModalService) {}
  PostalAdress = new FormGroup({
    PostBox: new FormControl(''),
    StreetName: new FormControl('', Validators.required),
    BuildingNumber: new FormControl(''),
    CityName: new FormControl('', Validators.required),
    PostalZone: new FormControl(''),
    CountrySubentity: new FormControl(''),
    Country: new FormGroup({
      IdentificationCode: new FormControl('', Validators.required),
    }),
  });

  public id: string;

  ngOnInit(): void {
    this.modalService.subscribeOpenModal().subscribe((res) => {
      this.id = res;
    });
  }

  closeModal() {
    this.search.nativeElement.value = '';
    this.id = undefined;
    this.PostalAdress.reset();
    localStorage.removeItem('undefined');
  }
  outsideClick($event) {
    const event = $event.target as Element;
    console.log(event.className);
    if (event.className == 'opened') {
      this.closeModal();
    }
  }
  returnForm() {
    if (this.PostalAdress.valid) {
      this.modalService.closeModal(this.id, this.PostalAdress.getRawValue());
      this.search.nativeElement.value = '';
      this.PostalAdress.reset();
      this.closeModal();
    } else return;
  }

  ngOnDestroy(): void {}
  @ViewChild('search') search: ElementRef;

  ngAfterViewInit(): void {
    let autocomplete: google.maps.places.Autocomplete;
    const loader = new Loader({
      apiKey: environment.placesKey,
      version: 'weekly',
      libraries: ['places'],
    });

    loader.importLibrary('places').then((google) => {
      autocomplete = new google.Autocomplete(this.search.nativeElement, {
        fields: ['address_components'],
        types: ['address'],
      });
      autocomplete.addListener('place_changed', () => {
        const location = autocomplete.getPlace().address_components;

        location.forEach((item) => {
          switch (item.types[0]) {
            case 'street_number':
              this.PostalAdress.controls.BuildingNumber.setValue(
                item.long_name
              );
              break;
            case 'locality':
              this.PostalAdress.controls.CityName.setValue(item.long_name);
              break;
            case 'administrative_area_level_1':
              this.PostalAdress.controls.CountrySubentity.setValue(
                item.long_name
              );
              break;
            case 'route':
              this.PostalAdress.controls.StreetName.setValue(item.long_name);
              break;
            case 'country':
              this.PostalAdress.controls.Country.controls.IdentificationCode.setValue(
                item.short_name
              );
              break;
            case 'postal_code':
              this.PostalAdress.controls.PostalZone.setValue(item.long_name);
          }
        });
      });
    });
  }
}
