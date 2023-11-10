import {
  trigger,
  transition,
  style,
  animate,
  group,
  query,
  animateChild,
  stagger,
  state,
} from '@angular/animations';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CreateInvoice } from 'src/app/services/invoice-services/articles.service';
import { ClientService } from 'src/app/services/invoice-services/client.service';
import { InvoiceDetails } from 'src/app/services/invoice-services/details.service';

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
  public clientToggle = false;
  public detailsToggle = false;
  public clientValid: boolean;
  public detailsValid: boolean;
  public itemsValid: boolean;
  public invoiceValid: boolean;
  private invoiceSub = new Subscription();
  private clientSub = new Subscription();
  private clientValidationSub = new Subscription();
  private clientNameSub = new Subscription();
  private detailsSub = new Subscription();
  private itemsSub = new Subscription();
  public clientDetails = JSON.parse(localStorage.getItem('Client'))?.Party;
  public clientName = JSON.parse(localStorage.getItem('Client'))?.Party
    .PartyName.Name;
  constructor(
    private client: ClientService,
    private items: CreateInvoice,
    private details: InvoiceDetails
  ) {}
  ngOnInit(): void {
    this.invoiceSub = this.details.getInvoiceValidation().subscribe((res) => {
      console.log('invoice ' + res);
      this.invoiceValid = res;
    });
    this.detailsSub = this.details.getDetailsValidation().subscribe((res) => {
      console.log(res);
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
    this.clientNameSub = this.client.getClientName().subscribe((res) => {
      this.clientName = res;
    });
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
    this.clientNameSub.unsubscribe();
    this.itemsSub.unsubscribe();
    this.detailsSub.unsubscribe();
  }
}
