export interface Item {
  Item: {
    Name: string;
    ClassifiedTaxCategory: {
      ID: string;
      Percent: number;
      TaxScheme: string;
    };
  };
  Price: {
    PriceAmount: number;
    BaseQuantity: number;
    UnitCode: string;
  };
  
}
