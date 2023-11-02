import { Component, ViewChildren } from '@angular/core';
import { Observable, Subject, Subscription, debounceTime } from 'rxjs';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { startWith, map } from 'rxjs';
import { OnInit, AfterViewInit } from '@angular/core';
import { trigger, transition, animate, style } from '@angular/animations';
import { ChangeDetectorRef } from '@angular/core';
import { CreateInvoice } from 'src/app/services/invoice-services/articles.service';
import { InvoiceDetails } from 'src/app/services/invoice-services/details.service';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';

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
        animate('200ms'),
      ]),
    ]),
  ],
})
export class TabelComponent implements OnInit, AfterViewInit {
  constructor(
    private cd: ChangeDetectorRef,
    private invoice: CreateInvoice,
    private details: InvoiceDetails
  ) {}
  @ViewChildren('autosize') autosize: CdkTextareaAutosize;
  tabel = new FormGroup({
    array: new FormArray([
      new FormGroup({
        articol: new FormControl('', Validators.required),
        unit: new FormControl('', Validators.required),
        bucati: new FormControl('', Validators.required),
        pret: new FormControl('', Validators.required),
      }),
    ]),
  });
  vatPercent: string;
  netto: string;
  articleOptions = JSON.parse(sessionStorage.getItem('ARTICLES'));
  filteredOptions: Observable<
    { articol: string; unit: string; pret: string }[]
  >[] = [];
  disableAnimation = true;
  currency: string;
  clearTableEvent = new Subscription();

  private _filter2(
    value: string
  ): { articol: string; unit: string; pret: string }[] {
    const filterValue = value;
    return this.articleOptions?.filter((option) =>
      option.articol.toLowerCase().includes(filterValue.toLowerCase())
    );
  }
  suma(i: number) {
    return (
      parseFloat(this.tabel.controls.array.controls[i].controls.bucati.value) *
        parseFloat(this.tabel.controls.array.controls[i].controls.pret.value) ||
      0
    ).toFixed(2);
  }

  manageAutocompleteInArray(i: number) {
    this.filteredOptions[i] = this.tabel.controls.array.controls[
      i
    ].controls.articol.valueChanges.pipe(
      startWith(''),
      map((value: string) => {
        if (value != null) return this._filter2(value);
        else return undefined;
      })
    );
  }
  autofillRow(value: string, i: number) {
    console.log(value);
    let selected = this.articleOptions.find((item) => item.articol == value);
    console.log(selected);
    this.tabel.controls.array.controls[i].patchValue(selected);
  }
  removeInput(index: number) {
    this.disableAnimation = false;
    const arrayControls = this.tabel.controls.array;
    if (arrayControls.length > 1) {
      arrayControls.removeAt(index);
    } else {
      arrayControls.reset();
      localStorage.removeItem('TabelValues');
    }
  }

  addInput() {
    this.disableAnimation = false;
    this.tabel.controls.array.push(
      new FormGroup({
        articol: new FormControl(''),
        unit: new FormControl(''),
        bucati: new FormControl(''),
        pret: new FormControl(''),
      })
    );
    this.manageAutocompleteInArray(this.tabel.controls.array.length - 1);
  }

  ngOnInit(): void {
    this.clearTableEvent = this.invoice
      .subscribeClearTable()
      .subscribe((res) => {
        this.tabel.reset();
        while (this.tabel.controls.array.length !== 1) {
          this.tabel.controls.array.removeAt(0);
        }
      });

    this.details.getCurrency().subscribe((res) => {
      this.currency = res;
    });

    this.details.getvatPercent().subscribe((res) => {
      this.vatPercent = res;
    });

    this.tabel.controls.array.valueChanges
      .pipe(debounceTime(500))
      .subscribe(() => {
        localStorage.setItem(
          'TableValues',
          JSON.stringify(this.tabel.controls.array.value)
        );

        this.invoice.setArticlesValidation(this.tabel.controls.array.valid);

        let total = 0;
        this.tabel.controls.array.controls.forEach((articol) => {
          total +=
            parseFloat(articol.value.bucati) * parseFloat(articol.value.pret) ||
            0;
        });
        this.invoice.setnetto(
          (total / (1 + parseFloat(this.vatPercent) / 100)).toFixed(2)
        );
        this.invoice.setVat(
          (total - total / (1 + parseFloat(this.vatPercent) / 100)).toFixed(2)
        );
        this.invoice.setTotal(total.toFixed(2));
        this.cd.detectChanges();
      });

    this.manageAutocompleteInArray(0);

    const rememberedTable = JSON.parse(localStorage.getItem('TableValues'));
    if (rememberedTable) {
      rememberedTable.forEach((articol, index) => {
        if (index === 0) {
          this.tabel.controls.array.controls[index].setValue({
            articol: articol.articol,
            unit: articol.unit,
            bucati: articol.bucati,
            pret: articol.pret,
          });
        } else {
          this.tabel.controls.array.push(
            new FormGroup({
              articol: new FormControl(articol.articol),
              unit: new FormControl(articol.unit),
              bucati: new FormControl(articol.bucati),
              pret: new FormControl(articol.pret),
            })
          );
        }
      });
    }
  }
  ngAfterViewInit(): void {
    this.cd.detectChanges();
  }
}
