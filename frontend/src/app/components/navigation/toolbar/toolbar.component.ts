import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/invoice-services/client.service';
import { InvoiceDetails } from 'src/app/services/invoice-services/details.service';
import { CreateInvoice } from 'src/app/services/invoice-services/articles.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  public currentTab: string;
  public clientValid: boolean;
  public detailsValid: boolean;
  public invoiceValid: boolean;
  public articlesValid: boolean;
  constructor(
    private client: ClientService,
    private details: InvoiceDetails,
    private invoice: CreateInvoice
  ) {}
  ngOnInit(): void {
    this.currentTab = 'client';
    this.client.getFormValidation().subscribe((res) => {
      this.clientValid = res.valid;
    });
    this.details.getDetailsValidation().subscribe((res) => {
      this.detailsValid = res;
    });
    this.details.getInvoiceValidation().subscribe((res) => {
      this.invoiceValid = res;
    });
    this.invoice.getArticlesValidation().subscribe((res) => {
      this.articlesValid = res;
    });
  }
}
