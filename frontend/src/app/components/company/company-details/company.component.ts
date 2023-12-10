import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AccountService } from '../../../services/account.service';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Company } from '../../../models/company.model';
import { User } from 'src/app/models/user.model';
import { ModalService } from 'src/app/services/modal.service';
import { CurrencySymbolMap } from 'src/app/models/currencies.model';
import { InvoiceService } from 'src/app/services/invoice-services/invoice.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss'],
})
export class CompanyComponent implements OnInit, OnDestroy {
  constructor(
    private account: AccountService,
    private modalService: ModalService,
    private invoice: InvoiceService
  ) {}
  companySub: Subscription;
  activeImage: string;
  company: Company;
  logoChanged = false;
  currencyList = CurrencySymbolMap;

  Supplier = new FormGroup({
    Party: new FormGroup({
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
        PostalZone: new FormControl(''),
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
    }),

    PayeeFinancialAccount: new FormGroup({
      ID: new FormControl('', Validators.required),
      CurrencyCode: new FormControl(''),
      FinancialInstitution: new FormGroup({
        ID: new FormControl('', Validators.required),
        Name: new FormControl(''),
      }),
    }),
    Logo: new FormControl(File),
  });

  ngOnInit(): void {
    this.companySub = this.account.getUser().subscribe((res: User) => {
      if (res) {
        this.activeImage = res.Logo;
        this.company = res;
        this.Supplier.patchValue(res);
        this.invoice.set_AccountingSupplierParty(res.Party);
        this.invoice.set_PaymentMeans(res.PayeeFinancialAccount);
      }
    });
    this.Supplier.valueChanges.subscribe(() => {
      this.account.setCompanyValidation(this.Supplier.valid);
    });
    this.modalService.subscribeCloseModal().subscribe((res) => {
      if (res.id == 'Supplier') {
        this.Supplier.controls.Party.controls.PostalAdress.patchValue(
          res.PostalAdress
        );
      }
    });
  }

  onFileChange(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      this.logoChanged = true;
      const file = event.target.files[0];
      this.Supplier.controls.Logo.setValue(file);
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.activeImage = reader.result as string;
      };
    }
  }
  save() {
    let company = this.convertJsontoFormData(
      this.Supplier.value,
      '',
      new FormData()
    );

    this.account.updateCompany(company);
  }
  convertJsontoFormData(
    jsonObject: Object,
    parentKey,
    carryFormData: FormData
  ): FormData {
    const formData = carryFormData || new FormData();
    let index = 0;

    for (var key in jsonObject) {
      if (jsonObject.hasOwnProperty(key)) {
        if (jsonObject[key] !== null && jsonObject[key] !== undefined) {
          var propName = parentKey || key;
          if (parentKey && this.isObject(jsonObject)) {
            propName = parentKey + '[' + key + ']';
          }
          if (parentKey && this.isArray(jsonObject)) {
            propName = parentKey + '[' + index + ']';
          }
          if (jsonObject[key] instanceof File) {
            formData.append(propName, jsonObject[key]);
          } else if (jsonObject[key] instanceof FileList) {
            for (var j = 0; j < jsonObject[key].length; j++) {
              formData.append(
                propName + '[' + j + ']',
                jsonObject[key].item(j)
              );
            }
          } else if (
            this.isArray(jsonObject[key]) ||
            this.isObject(jsonObject[key])
          ) {
            this.convertJsontoFormData(jsonObject[key], propName, formData);
          } else if (typeof jsonObject[key] === 'boolean') {
            formData.append(propName, +jsonObject[key] ? '1' : '0');
          } else {
            formData.append(propName, jsonObject[key]);
          }
        }
      }
      index++;
    }
    return formData;
  }
  isArray(val) {
    const toString = {}.toString;
    return toString.call(val) === '[object Array]';
  }

  isObject(val) {
    return !this.isArray(val) && typeof val === 'object' && !!val;
  }

  openModal() {
    this.modalService.openModal(
      'Supplier',
      this.Supplier.controls.Party.controls.PostalAdress.getRawValue()
    );
  }

  ngOnDestroy() {
    this.companySub.unsubscribe();
  }
}
