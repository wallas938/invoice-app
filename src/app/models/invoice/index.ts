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
  totalAmount: string;
};

export interface InvoiceUpdateDto {
  _id: string;
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
  totalAmount: string;
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
  term: string;
  desc: string;
  items: Item[];
  status: string;
  totalAmount: string;
};

export interface Item {
  itemName: string;
  quantity: number;
  price: string;
  total: string;
}
