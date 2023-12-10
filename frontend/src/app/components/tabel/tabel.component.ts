import { Component, ViewChildren } from '@angular/core';
import { Observable, Subject, Subscription, debounceTime } from 'rxjs';
import {
  FormArray,
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { startWith, map } from 'rxjs';
import { OnInit, AfterViewInit } from '@angular/core';
import { trigger, transition, animate, style } from '@angular/animations';
import { ChangeDetectorRef } from '@angular/core';
import { CreateInvoice } from 'src/app/services/invoice-services/articles.service';
import { InvoiceDetails } from 'src/app/services/invoice-services/details.service';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Item } from 'src/app/models/item.model';
import { Invoice } from 'src/app/models/invoice.model';
import { CurrencyPipe } from '@angular/common';
import { UnitSymbolMap } from 'src/app/models/units.model';
import { TaxSubtotal } from 'src/app/models/tax-subtotal.model';
import { InvoiceService } from 'src/app/services/invoice-services/invoice.service';

@Component({
  selector: 'app-tabel',
  templateUrl: './tabel.component.html',
  styleUrls: ['./tabel.component.scss'],
  animations: [
    trigger('slide', [
      transition(':leave', [
        animate('150ms', style({ height: 0, opacity: 0 })),
      ]),
      transition(':enter', [
        style({ height: 0, opacity: 0 }),
        animate('200ms', style({ height: '*', opacity: 1 })),
      ]),
    ]),
  ],
})
export class TabelComponent implements OnInit {
  constructor(
    private createInvoice: CreateInvoice,
    private details: InvoiceDetails,
    private currencyPipe: CurrencyPipe,
    private invoice: InvoiceService
  ) {}
  @ViewChildren('autosize') autosize: CdkTextareaAutosize;

  Lines = new FormGroup({
    array: new FormArray([
      new FormGroup({
        InvoicedQuantity: new FormControl('', Validators.required),
        LineExtensionAmount: new FormControl(),
        Item: new FormGroup({
          Name: new FormControl('', Validators.required),
          ClassifiedTaxCategory: new FormGroup({
            ID: new FormControl('S'),
            Percent: new FormControl('0', Validators.required),
            TaxScheme: new FormGroup({
              ID: new FormControl(''),
            }),
          }),
        }),
        Price: new FormGroup({
          PriceAmount: new FormControl('', Validators.required),
          BaseQuantity: new FormControl(''),
          UnitCode: new FormControl('', Validators.required),
        }),
      }),
    ]),
  });
  units = UnitSymbolMap;
  articleOptions: Item[];
  filteredOptions: Observable<Item[]>;
  disableAnimation = true;
  currency = JSON.parse(localStorage.getItem('InvoiceDetails'))
    ?.DocumentCurrencyCode;
  clearTableEvent = new Subscription();

  private _filter2(value: string): Item[] {
    const filterValue = value;
    return this.articleOptions?.filter((option) =>
      option.Item.Name.toLowerCase().includes(filterValue.toLowerCase())
    );
  }
  suma(i: number) {
    let x = (
      parseFloat(
        this.Lines.controls.array.controls[i].controls.InvoicedQuantity.value
      ) *
        parseFloat(
          this.Lines.controls.array.controls[i].controls.Price.controls
            .PriceAmount.value
        ) || 0
    ).toFixed(2);
    this.Lines.controls.array.at(i).controls.LineExtensionAmount.setValue(x);
    return x;
  }

  manageAutocompleteInArray(i: number) {
    // if (!this.filteredOptions) return;
    this.filteredOptions = this.Lines.controls.array.controls[
      i
    ].controls.Item.controls.Name.valueChanges.pipe(
      startWith(''),
      map((value: string) => {
        if (value != null) return this._filter2(value);
        else return undefined;
      })
    );
  }
  autofillRow(value: string, i: number) {
    let selected = this.articleOptions.find((item) => item.Item.Name == value);
    console.log(selected);
    this.Lines.controls.array.controls[i].controls.Item.patchValue(
      selected.Item
    );
    this.Lines.controls.array.controls[i].controls.Price.patchValue(
      selected.Price
    );
  }
  removeInput(index: number) {
    this.disableAnimation = false;
    if (this.Lines.controls.array.length > 1) {
      this.Lines.controls.array.removeAt(index);
    } else {
      this.Lines.reset();
      localStorage.removeItem('LinesValues');
    }
  }

  addInput() {
    this.disableAnimation = false;
    this.Lines.controls.array.push(
      new FormGroup({
        InvoicedQuantity: new FormControl('', Validators.required),
        LineExtensionAmount: new FormControl(),
        Item: new FormGroup({
          Name: new FormControl('', Validators.required),
          ClassifiedTaxCategory: new FormGroup({
            ID: new FormControl('S'),
            Percent: new FormControl('0', Validators.required),
            TaxScheme: new FormGroup({
              ID: new FormControl('VAT'),
            }),
          }),
        }),
        Price: new FormGroup({
          PriceAmount: new FormControl('', Validators.required),
          BaseQuantity: new FormControl(''),
          UnitCode: new FormControl('', Validators.required),
        }),
      })
    );
    // this.manageAutocompleteInArray(this.Lines.controls.array.length - 1);
  }

  ngOnInit(): void {
    if (sessionStorage.getItem('Articles')) {
      this.articleOptions = JSON.parse(sessionStorage.getItem('Articles'));
    }

    this.clearTableEvent = this.createInvoice
      .subscribeClearTable()
      .subscribe((res) => {
        this.Lines.reset();
        while (this.Lines.controls.array.length !== 1) {
          this.Lines.controls.array.removeAt(0);
        }
      });

    this.details.getCurrency().subscribe((res) => {
      this.currency = res;
      this.updateCurrency();
    });

    this.Lines.controls.array.valueChanges
      .pipe(debounceTime(500))
      .subscribe(() => {
        this.createInvoice.setArticlesValidation(this.Lines.valid);
        this.updateCurrency();
        this.setInvoiceTotals();
        this.invoice.set_Lines(this.Lines.controls.array.value);
        localStorage.setItem('TableValues', JSON.stringify(this.Lines.value));
      });

    // this.manageAutocompleteInArray(0);

    const rememberedTable = JSON.parse(
      localStorage.getItem('TableValues')
    )?.array;

    if (rememberedTable) {
      rememberedTable.forEach((InvoiceLine, index) => {
        if (index == 0) {
          this.Lines.controls.array.controls[0].setValue(InvoiceLine);
        } else
          this.Lines.controls.array.push(
            new FormGroup({
              InvoicedQuantity: new FormControl(InvoiceLine.InvoicedQuantity),
              LineExtensionAmount: new FormControl(
                InvoiceLine.LineExtensionAmount
              ),
              Item: new FormGroup({
                Name: new FormControl(InvoiceLine.Item.Name),
                ClassifiedTaxCategory: new FormGroup({
                  ID: new FormControl(
                    InvoiceLine.Item.ClassifiedTaxCategory.ID
                  ),
                  Percent: new FormControl(
                    InvoiceLine.Item.ClassifiedTaxCategory.Percent
                  ),
                  TaxScheme: new FormGroup({
                    ID: new FormControl(
                      InvoiceLine.Item.ClassifiedTaxCategory.TaxScheme.ID
                    ),
                  }),
                }),
              }),
              Price: new FormGroup({
                PriceAmount: new FormControl(InvoiceLine.Price.PriceAmount),
                BaseQuantity: new FormControl(InvoiceLine.Price.BaseQuantity),
                UnitCode: new FormControl(InvoiceLine.Price.UnitCode),
              }),
            })
          );
      });
    }
  }

  updateCurrency() {
    this.Lines.controls.array.controls.forEach((InvoiceLine) => {
      InvoiceLine.controls.LineExtensionAmount.patchValue(
        this.currencyPipe.transform(
          parseFloat(InvoiceLine.controls.InvoicedQuantity.value) *
            parseFloat(InvoiceLine.controls.Price.controls.PriceAmount.value),
          this.currency
        ),
        { emitEvent: false }
      );
    });
  }

  setInvoiceTotals() {
    let totalNoVat = 0;
    let totalWithVat = 0;
    let taxSubtotals: TaxSubtotal[] = [];

    this.Lines.controls.array.controls.forEach((InvoiceLine) => {
      totalNoVat +=
        parseFloat(InvoiceLine.controls.InvoicedQuantity.value) *
        parseFloat(InvoiceLine.controls.Price.controls.PriceAmount.value);
      totalWithVat +=
        parseFloat(InvoiceLine.controls.InvoicedQuantity.value) *
        parseFloat(InvoiceLine.controls.Price.controls.PriceAmount.value) *
        (1 +
          parseFloat(
            InvoiceLine.controls.Item.controls.ClassifiedTaxCategory.controls
              .Percent.value
          ) /
            100);

      let SameTaxCategory_index = taxSubtotals.findIndex(
        (element) =>
          element.TaxSubtotal.TaxCategory.ID ===
            InvoiceLine.controls.Item.controls.ClassifiedTaxCategory.controls.ID
              .value &&
          element.TaxSubtotal.TaxCategory.Percent ===
            InvoiceLine.controls.Item.controls.ClassifiedTaxCategory.controls
              .Percent.value
      );

      if (SameTaxCategory_index >= 0) {
        taxSubtotals[SameTaxCategory_index].TaxSubtotal.TaxableAmount = (
          parseFloat(
            taxSubtotals[SameTaxCategory_index].TaxSubtotal.TaxableAmount
          ) +
          parseFloat(InvoiceLine.controls.InvoicedQuantity.value) *
            parseFloat(InvoiceLine.controls.Price.controls.PriceAmount.value)
        ).toFixed(2);
      } else {
        taxSubtotals.push({
          TaxSubtotal: {
            TaxableAmount: (
              parseFloat(InvoiceLine.controls.InvoicedQuantity.value) *
              parseFloat(InvoiceLine.controls.Price.controls.PriceAmount.value)
            ).toFixed(2),
            TaxCategory:
              InvoiceLine.controls.Item.controls.ClassifiedTaxCategory.getRawValue(),
          },
        });
      }
    });
    this.invoice.setTaxSubtotal(
      (totalWithVat - totalNoVat).toFixed(2),
      taxSubtotals
    );
    this.invoice.set_Total(totalNoVat, totalWithVat);
    this.createInvoice.setnetto(totalNoVat.toFixed(2) || '0');
    this.createInvoice.setTotal(totalWithVat.toFixed(2) || '0');
    this.createInvoice.setVat((totalWithVat - totalNoVat).toFixed(2) || '0');
  }
}
