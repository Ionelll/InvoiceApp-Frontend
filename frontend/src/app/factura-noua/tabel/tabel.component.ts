import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { startWith, map } from 'rxjs';
import { AfterViewInit, OnInit } from '@angular/core';
import { trigger, transition, animate, style } from '@angular/animations';
import { ChangeDetectorRef } from '@angular/core';
import { ViewChildren, QueryList } from '@angular/core';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { CreateInvoice } from 'src/app/services/create-invoice.service';

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
export class TabelComponent implements AfterViewInit, OnInit {
  constructor(
    private api: ApiService,
    private cd: ChangeDetectorRef,
    private invoice: CreateInvoice
  ) {}
  @ViewChildren('autosize') autosize: QueryList<CdkTextareaAutosize>;
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
  netto = '';
  options2 = [];
  filteredoptions2: Observable<string[]>[] = [];
  mwst = '19';
  remembertable: [
    { articol: string; unit: string; bucati: string; pret: string }
  ];
  animif = true;
  currency = '($)';

  private _filter2(value: string): string[] {
    if (value.length > 2) {
      const filterValue = value;
      return this.options2.filter((option) =>
        option.toLowerCase().includes(filterValue.toLowerCase())
      );
    } else return [];
  }
  suma(i: number) {
    return (
      parseFloat(this.tabel.controls.array.controls[i].controls.bucati.value) *
      parseFloat(this.tabel.controls.array.controls[i].controls.pret.value)
    );
  }

  manageAutocompleteInArray(i: number) {
    this.filteredoptions2[i] = this.tabel.controls.array.controls[
      i
    ].controls.articol.valueChanges.pipe(
      startWith(''),
      map((value: string) => {
        return this._filter2(value);
      })
    );
  }

  removeInput(i: number) {
    if (this.tabel.controls.array.length > 1) {
      this.tabel.controls.array.removeAt(i);
    } else {
      this.tabel.controls.array.setValue([
        { articol: '', unit: '', bucati: '', pret: '' },
      ]);
      localStorage.removeItem('TabelValues');
    }
  }

  currencytransform(value: string, i: number) {
    console.log(this.tabel.controls.array.controls[i].get('pret').value);
  }

  addInput() {
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
    let z = ((parseFloat(this.netto) * parseInt(this.mwst)) / 100 || 0).toFixed(
      2
    );
    this.invoice.setVat(z);
    localStorage.setItem('Vat', z);
    return z;
  }

  getTotal() {
    let z = (parseFloat(this.netto) + parseFloat(this.getTva())).toFixed(2);
    this.invoice.setTotal(z);
    localStorage.setItem('Total', z);
    return z;
  }

  ngOnInit(): void {
    this.invoice.getnetto().subscribe((res) => {
      this.netto = res;
    });

    this.tabel.controls.array.valueChanges.subscribe(() => {
      localStorage.setItem(
        'TableValues',
        JSON.stringify(this.tabel.controls.array.value)
      );
      let z = 0;
      this.tabel.controls.array.controls.forEach((item) => {
        z += parseFloat(item.value.bucati) * parseFloat(item.value.pret) || 0;
      });
      this.invoice.setnetto(z.toFixed(2));
      this.cd.detectChanges();
    });

    window.onbeforeprint = () => {
      document.getElementById('content').setAttribute('style', 'width:1150px;');
      this.cd.detectChanges();
      this.autosize.forEach((item) => item.resizeToFitContent(true));
    };

    this.manageAutocompleteInArray(0);

    this.remembertable = JSON.parse(localStorage.getItem('TableValues'));
    if (this.remembertable) {
      this.remembertable.forEach((item, index) => {
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

    // this.api.nrfactura$.subscribe(res=>{this.nrfactura=res})
  }
  ngAfterViewInit(): void {
    this.animif = false;
  }
}
