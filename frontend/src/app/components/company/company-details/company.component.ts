import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AccountService } from '../../../services/account.service';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Company } from '../../../models/company.model';
import {
  animate,
  query,
  stagger,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss'],
  animations: [
    trigger('slide', [
      transition(':enter', [
        query(':self', [
          stagger('0.5s', [
            style({ transform: 'translateY(-100%)' }),
            animate('0.5s', style({ transform: 'translateY(0)' })),
          ]),
        ]),
      ]),
      transition(':leave', [
        animate('0.3s', style({ transform: 'translateY(-100%)' })),
      ]),
    ]),
    //     trigger('grow', [
    //       transition(':enter', [
    //         style({ transform: 'translateY(-100%)' }),
    //         animate('0.5s', style({ transform: 'translateY(0)' })),
    //       ]),

    //       transition(':leave', [animate('0.5s', style({ height: 0 }))]),
    //     ]),
  ],
})
export class CompanyComponent implements OnInit, OnDestroy {
  constructor(private account: AccountService) {}
  companyName: string;
  companySub: Subscription;
  toggle = true;
  user = false;
  activeImage: string;
  company = new FormData();
  logoChanged = false;
  currencyList = ['EUR', 'RON', 'GBP'];

  Supplier = new FormGroup({
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
      PostalZone: new FormControl('', Validators.required),
      CountrySubentity: new FormControl(''),
      Country: new FormGroup({
        IdentificationCode: new FormControl('', Validators.required),
      }),
    }),
    Contact: new FormGroup({
      Name: new FormControl(''),
      Telephone: new FormControl(''),
      ElectronicMail: new FormControl(''),
    }),
    PayeeFinancialAccount: new FormGroup({
      ID: new FormControl('', Validators.required),
      CurrencyCode: new FormControl(''),
      FinancialInstitution: new FormGroup({
        ID: new FormControl('', Validators.required),
        Name: new FormControl(''),
      }),
    }),
  });

  ngOnInit(): void {
    this.companySub = this.account.getUser().subscribe((res) => {
      if (res) {
        this.activeImage = res.logo;
        localStorage.setItem('Logo', res.logo);
        this.user = true;
        this.Supplier.patchValue(res.company.Party);
        this.toggle = false;
        // } else {
        //   localStorage.removeItem('Company');
      }
    });
    this.Supplier.valueChanges.subscribe(() => {
      localStorage.setItem('Company', JSON.stringify(this.Supplier.value));
      this.account.setCompanyValidation(this.Supplier.valid);
    });
    this.Supplier.controls.PartyName.valueChanges.subscribe((res) => {
      this.companyName = res.Name || 'My Company';
    });
    this.Supplier.patchValue(JSON.parse(localStorage.getItem('Company')));
  }

  onFileChange(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      this.logoChanged = true;
      const [file] = event.target.files;
      this.company.set('logo', file as File);
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.activeImage = reader.result as string;
      };
    }
  }
  save() {
    this.company.set('company', localStorage.getItem('Company'));
    this.account.updateCompany(this.company);
  }

  ngOnDestroy() {
    this.companySub.unsubscribe();
  }
}
