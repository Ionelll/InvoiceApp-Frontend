import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription, debounceTime } from 'rxjs';
import { ClientService } from 'src/app/services/invoice-services/client.service';
import { InvoiceService } from 'src/app/services/invoice-services/invoice.service';
import { Invoice } from 'src/app/models/invoice.model';

@Component({
  selector: 'app-saved-invoices',
  templateUrl: './saved-invoices.component.html',
  styleUrl: './saved-invoices.component.scss',
})
export class SavedInvoicesComponent implements OnInit, OnDestroy {
  constructor(
    private client: ClientService,
    private invoiceService: InvoiceService
  ) {}
  searchForm = new FormGroup({
    searchInput: new FormControl(''),
    startDate: new FormControl(),
    endDate: new FormControl(),
  });
  clientList = [''];
  invoiceList: Invoice[];
  invoiceListSubscription = new Subscription();
  clientListSubscription = new Subscription();

  ngOnInit() {
    this.invoiceListSubscription = this.invoiceService
      .getInvoices()
      .subscribe((res) => {
        this.invoiceList = res;
      });
    this.clientListSubscription = this.client
      .getClients()
      .subscribe((response) => {
        this.clientList = response;
      });
    this.searchForm.controls.searchInput.valueChanges
      .pipe(debounceTime(500))
      .subscribe((value) => {
        if (this.searchForm.controls.searchInput.value.length >= 3) {
          this.client.setClients(value);
        }
      });
  }

  searchInvoice() {
    this.invoiceService.setInvoices(this.searchForm.value);
  }

  ngOnDestroy(): void {
    this.clientListSubscription.unsubscribe();
  }
}
