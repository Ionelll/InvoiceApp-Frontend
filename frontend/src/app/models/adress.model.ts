export interface Adress {
  Postbox?: string;
  StreetName: string;
  BuildingNumber?: string;
  CityName: string;
  PostalZone?: string;
  CountrySubentity?: string;
  Country: { IdentificationCode: string };
}
