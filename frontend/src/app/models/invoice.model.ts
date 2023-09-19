export interface Factura {
  id?: string;
  client: {
    type: string;
    clientId: string;
  };
  issueDate: string;
  dueDate: string;
  vat: string;
  currency: string;
  total: string;
  invoiceNumber: string;
  table: string;
}
