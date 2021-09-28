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
  totalAmount: Number;
};

export interface InvoiceGetDto {
  _id: string;
  invoiceCode: string;
  from: {
    address: {
      street: string;
      city: string;
      postCode: string;
      country: string;
    }
  };
  to: {
    address: {
      street: string;
      city: string;
      postCode: string;
      country: string;
    };
    clientName: string;
    email: string;
  };
  invoiceDate: string;
  paymentTerms: string;
  desc: string;
  items: Item[];
  status: string;
  totalAmount: Number;
};

export interface Item {
  itemName: string;
  quantity: number;
  price: number;
  total: number;
}
