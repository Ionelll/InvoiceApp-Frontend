import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CurrencySymbolMap } from 'src/app/models/currencies.model';
import { Item } from 'src/app/models/item.model';
import { UnitSymbolMap } from 'src/app/models/units.model';
import { User } from 'src/app/models/user.model';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  constructor(private account: AccountService, private cd: ChangeDetectorRef) {}
  company: boolean;
  currencyList = CurrencySymbolMap;
  unitList = UnitSymbolMap;
  items: Item[];
  index: number;

  itemsForm = new FormGroup({
    Item: new FormGroup({
      Name: new FormControl('', Validators.required),
      ClassifiedTaxCategory: new FormGroup({
        ID: new FormControl('S', Validators.required),
        Percent: new FormControl('', Validators.required),
        TaxScheme: new FormGroup({
          ID: new FormControl('VAT', Validators.required),
        }),
      }),
    }),
    Price: new FormGroup({
      PriceAmount: new FormControl('', Validators.required),
      BaseQuantity: new FormControl('1', Validators.required),
      UnitCode: new FormControl('', Validators.required),
    }),
  });
  initialValues = this.itemsForm.value;

  settingsForm = new FormGroup({
    duePeriod: new FormControl(),
    DocumentCurrencyCode: new FormControl(),
    introduction: new FormControl(
      'Thank you for your order and your trust. You will be charged the following amount for our work and material:'
    ),
    Note: new FormControl(),
    PaymentTerms: new FormGroup({
      Note: new FormControl(''),
    }),
  });

  ngOnInit(): void {
    this.account.getUser().subscribe((res: User) => {
      if (res) {
        this.items = res.Items;
        this.settingsForm.patchValue(res.invoiceSettings);
      }
    });
  }
  addItem() {
    this.items.push(this.itemsForm.getRawValue());
    this.account.updateItems(this.items);
    this.itemsForm.reset(this.initialValues);
  }

  deleteItem(index) {
    this.items.splice(index, 1);
    this.account.updateItems(this.items);
  }
  editItem(i, item) {
    this.index = i;
    this.itemsForm.patchValue(item);
  }
  saveItem() {
    this.items[this.index] = this.itemsForm.getRawValue();
    this.index = undefined;
    this.itemsForm.reset(this.initialValues);
    this.account.updateItems(this.items);
  }
  cancel() {
    this.itemsForm.reset(this.initialValues);
  }
  saveSettings() {
    this.account.updateSettings(this.settingsForm.value);
  }
}
