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
    trigger('openClose', [
      transition(':enter', [
        query('.form', [style({ opacity: 0 })]),

        query(':self', [
          style({ height: 0 }),
          animate('0.4s', style({ height: '*' })),
        ]),
        query('.form', stagger('0s', [animate('0.1s', style({ opacity: 1 }))])),
      ]),
      transition(':leave', [
        query('.form', [animate('0.1s', style({ opacity: 0 }))]),
        query(':self', [
          stagger('0s', [animate('0.4s', style({ height: 0 }))]),
        ]),
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
  private clientSub = new Subscription();
  private clientValidationSub = new Subscription();
  private clientNameSub = new Subscription();
  private detailsSub = new Subscription();
  private itemsSub = new Subscription();
  clientName = JSON.parse(localStorage.getItem('Client'))?.companyName;
  constructor(
    private client: ClientService,
    private items: CreateInvoice,
    private details: InvoiceDetails
  ) {}
  ngOnInit(): void {
    this.detailsSub = this.details.getDetailsValidation().subscribe((res) => {
      this.detailsValid = res;
    });
    this.itemsSub = this.items.getArticlesValidation().subscribe((res) => {
      this.itemsValid = res;
    });
    this.clientSub = this.client.getClient().subscribe((res) => {
      this.clientName = res.companyName;
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
    const invoiceNr = JSON.parse(
      localStorage.getItem('InvoiceNrandDate')
    ).invoiceNr;

    this.details.setInvoiceNr(invoiceNr);
    this.items.clearTable();
    this.details.emitResetDetails(true);
  }
  ngOnDestroy(): void {
    this.clientSub.unsubscribe();
    this.clientValidationSub.unsubscribe();
    this.clientNameSub.unsubscribe();
    this.itemsSub.unsubscribe();
    this.detailsSub.unsubscribe();
  }
}
