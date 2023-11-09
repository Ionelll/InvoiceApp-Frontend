import { Adress } from './adress.model';

export interface Company {
  _id?: string;
  Party: {
    EndpointID?: string;
    IndustryClassificationCode?: string;
    PartyIdentification: { ID: string };
    PartyName: { Name: string };
    PostalAdress: Adress;
    Contact?: {
      Name?: string;
      Telephone?: string;
      ElectronicMail?: string;
    };
    BuyerReference?: string;
  };
}
