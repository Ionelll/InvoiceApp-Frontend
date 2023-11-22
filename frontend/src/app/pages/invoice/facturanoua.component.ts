import { trigger, transition, style, animate } from '@angular/animations';
import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { CreateInvoice } from 'src/app/services/invoice-services/articles.service';
import { ClientService } from 'src/app/services/invoice-services/client.service';
import { deliveryService } from 'src/app/services/invoice-services/delivery.service';
import { InvoiceDetails } from 'src/app/services/invoice-services/details.service';
import { InvoiceService } from 'src/app/services/invoice-services/invoice.service';

@Component({
  selector: 'app-facturanoua',
  templateUrl: './facturanoua.component.html',
  styleUrls: ['./facturanoua.component.scss'],
  animations: [
    trigger('hideShow', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.1s', style({ opacity: 1 })),
      ]),

      transition(':leave', [animate('0.1s', style({ opacity: 0 }))]),
    ]),
    trigger('openClose', [
      transition(':enter', [
        style({ opacity: 0, height: '0' }),

        animate('0.4s', style({ height: '*', opacity: 1 })),
      ]),
      transition(':leave', [
        animate('0.4s', style({ height: '0', opacity: 0 })),
      ]),
    ]),
  ],
})
export class FacturaNouaComponent implements OnInit, OnDestroy {
  public clientToggle = true;
  public detailsToggle = false;
  public clientValid: boolean;
  public detailsValid: boolean;
  public itemsValid: boolean;
  public invoiceValid: boolean;
  private invoiceSub = new Subscription();
  private clientSub = new Subscription();
  private clientValidationSub = new Subscription();
  private detailsSub = new Subscription();
  private itemsSub = new Subscription();
  private deliverySub = new Subscription();
  public clientDetails = JSON.parse(
    localStorage.getItem('AccountingCustomerParty')
  )?.Party;
  public deliveryValid: boolean;

  constructor(
    private client: ClientService,
    private items: CreateInvoice,
    private details: InvoiceDetails,
    private cd: ChangeDetectorRef,
    private deliveryService: deliveryService,
    private invoice: InvoiceService
  ) {}

  ngOnInit(): void {
    this.deliverySub = this.deliveryService.getValidation().subscribe((res) => {
      this.deliveryValid = res;
    });
    setTimeout(() => {
      this.clientToggle = false;
    });

    this.invoiceSub = this.details.getInvoiceValidation().subscribe((res) => {
      this.invoiceValid = res;
    });
    this.detailsSub = this.details.getDetailsValidation().subscribe((res) => {
      this.detailsValid = res;
    });
    this.itemsSub = this.items.getArticlesValidation().subscribe((res) => {
      this.itemsValid = res;
    });

    this.clientSub = this.client.getClient().subscribe((res) => {
      this.clientDetails = res.Party;
    });
    this.clientValidationSub = this.client
      .getFormValidation()
      .subscribe((res) => {
        this.clientValid = res.valid;
      });
    this.cd.detectChanges();
  }

  newInvoice() {
    const invoiceNr = JSON.parse(localStorage.getItem('InvoiceNrandDate')).ID;

    this.details.setInvoiceNr(invoiceNr);
    this.items.clearTable();
    this.details.emitResetDetails(true);
  }
  ngOnDestroy(): void {
    this.invoiceSub.unsubscribe();
    this.clientSub.unsubscribe();
    this.clientValidationSub.unsubscribe();
    this.itemsSub.unsubscribe();
    this.detailsSub.unsubscribe();
    this.deliverySub.unsubscribe();
  }
  saveInvoice() {
    this.invoice.saveInvoice();
  }
}
