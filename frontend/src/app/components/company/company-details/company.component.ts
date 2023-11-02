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
  companydetails = new FormGroup({
    companyName: new FormControl('', Validators.required),
    adress: new FormGroup({
      country: new FormControl('', Validators.required),
      region: new FormControl(''),
      city: new FormControl('', Validators.required),
      street: new FormControl('', Validators.required),
      number: new FormControl('', Validators.required),
      postalCode: new FormControl('', Validators.required),
    }),
    registrationNumber: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', Validators.required),
    fax: new FormControl(''),
    website: new FormControl(''),
    caen: new FormControl(''),
    bank: new FormArray([
      new FormGroup({
        bankname: new FormControl(''),
        iban: new FormControl(''),
        bic: new FormControl(''),
      }),
    ]),
  });

  ngOnInit(): void {
    this.companySub = this.account.getCompany().subscribe((res) => {
      if (res) {
        this.activeImage = res.logo;
        localStorage.setItem('Logo', res.logo);
        this.user = true;
        this.companydetails.patchValue(res);
        this.toggle = false;
        // } else {
        //   localStorage.removeItem('Company');
      }
    });
    this.companydetails.valueChanges.subscribe(() => {
      localStorage.setItem(
        'Company',
        JSON.stringify(this.companydetails.value)
      );
      this.account.setCompanyValidation(this.companydetails.valid);
    });
    this.companydetails.controls.companyName.valueChanges.subscribe((res) => {
      this.companyName = res || 'My Company';
    });
    this.companydetails.patchValue(JSON.parse(localStorage.getItem('Company')));
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
