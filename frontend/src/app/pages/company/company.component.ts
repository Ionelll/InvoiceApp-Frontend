import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AccountService } from '../../services/account.service';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { Company } from '../../models/company.model';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss'],
})
export class CompanyComponent implements OnInit, OnDestroy, AfterViewInit {
  constructor(private account: AccountService) {}
  company: Company;
  companySub: Subscription;
  activeImage: string;
  companydetails = new FormGroup({
    companyName: new FormControl(''),
    adress: new FormGroup({
      country: new FormControl(''),
      region: new FormControl(''),
      city: new FormControl(''),
      street: new FormControl(''),
      number: new FormControl(''),
      postalCode: new FormControl(''),
    }),
    registrationNumber: new FormControl(''),
    email: new FormControl(''),
    telefon: new FormControl(''),
    fax: new FormControl(''),
    web: new FormControl(''),
    caen: new FormControl(''),
    banks: new FormArray([
      new FormGroup({
        bankName: new FormControl(''),
        iban: new FormControl(''),
        bic: new FormControl(''),
      }),
    ]),
  });

  ngOnInit(): void {}

  onFileChange(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.activeImage = reader.result as string;
      };
    }
  }
  save() {
    this.account.updateCompany(this.companydetails.value);
  }

  ngAfterViewInit(): void {
    this.account.isLoggedIn();
    this.companySub = this.account.getUser().subscribe((res) => {
      if (res) {
        this.company = res.company;
        this.companydetails.patchValue(this.company);
        if (this.company.logo) {
          this.activeImage = this.company.logo;
        }
      }
    });
  }
  ngOnDestroy() {
    this.companySub.unsubscribe();
  }
}
