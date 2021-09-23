export interface InvoiceCreateDto {
  fromStreet: string;
  fromCity: string;
  fromPostCode: string;
  fromCountry: string;
  clientName: string;
  email: string;
  toStreet: string;
  toCity: string;
  toPostCode: string;
  toCountry: string;
  invoiceDate: string;
  term: string;
  desc: string;
  items: Item[];
};

export interface Item {
  itemName: string;
  quantity: number;
  price: number;
  total: number;
}
