import { Item } from './item.model';

export interface invoiceLine {
  InvoiceLine: {
    InvoicedQuantity: string;
    LineExtensionAmount: string;
    Item: Item['Item'];
    Price: Item['Price'];
  };
}
