import { Component } from '@angular/core';
import { Observable, debounceTime } from 'rxjs';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { startWith, map } from 'rxjs';
import { OnInit } from '@angular/core';
import { trigger, transition, animate, style } from '@angular/animations';
import { ChangeDetectorRef } from '@angular/core';
import { CreateInvoice } from 'src/app/services/invoice-services/articles.service';
import { InvoiceDetails } from 'src/app/services/invoice-services/details.service';

@Component({
  selector: 'app-tabel',
  templateUrl: './tabel.component.html',
  styleUrls: ['./tabel.component.scss'],
  animations: [
    trigger('enterleave', [
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
export class TabelComponent implements OnInit {
  constructor(
    private cd: ChangeDetectorRef,
    private invoice: CreateInvoice,
    private details: InvoiceDetails
  ) {}

  tabel = new FormGroup({
    array: new FormArray([
      new FormGroup({
        articol: new FormControl(''),
        unit: new FormControl(''),
        bucati: new FormControl(''),
        pret: new FormControl(''),
      }),
    ]),
  });
  vatPercent: string;
  netto: string;
  articleOptions = [];
  filteredOptions: Observable<string[]>[] = [];
  disableAnimation = true;
  currency: string;

  private _filter2(value: string): string[] {
    if (value.length > 2) {
      const filterValue = value;
      return this.articleOptions.filter((option) =>
        option.toLowerCase().includes(filterValue.toLowerCase())
      );
    } else return [];
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
        return this._filter2(value);
      })
    );
  }

  removeInput(index: number) {
    this.disableAnimation = false;
    const arrayControls = this.tabel.controls.array;
    if (arrayControls.length > 1) {
      arrayControls.removeAt(index);
    } else {
      arrayControls.setValue([{ articol: '', unit: '', bucati: '', pret: '' }]);
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

  getTva() {
    let z = (
      (parseFloat(this.netto) * parseInt(this.vatPercent)) / 100 || 0
    ).toFixed(2);
    return z;
  }
  getTotal() {
    let z = (parseFloat(this.netto) + parseFloat(this.getTva()) || 0).toFixed(
      2
    );
    return z;
  }

  ngOnInit(): void {
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
        let total = 0;
        this.tabel.controls.array.controls.forEach((item) => {
          total +=
            parseFloat(item.value.bucati) * parseFloat(item.value.pret) || 0;
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
      rememberedTable.forEach((item, index) => {
        if (index === 0) {
          this.tabel.controls.array.controls[index].setValue({
            articol: item.articol,
            unit: item.unit,
            bucati: item.bucati,
            pret: item.pret,
          });
        } else {
          this.tabel.controls.array.push(
            new FormGroup({
              articol: new FormControl(item.articol),
              unit: new FormControl(item.unit),
              bucati: new FormControl(item.bucati),
              pret: new FormControl(item.pret),
            })
          );
        }
      });
    }
  }
}
