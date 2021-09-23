import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StoreService } from 'src/app/core/services/store/store.service';
import { InvoiceCreateDto } from 'src/app/models/invoice/invoiceCreateDto';

@Injectable({
  providedIn: 'root'
})
export class InvoiceFormService {

  private invoiceUrl = "http://localhost:3200/invoices"

  constructor(private http: HttpClient,
              private storeService: StoreService) { }

  saveInvoice(invoice: InvoiceCreateDto) {
    return this.http.post(`${this.invoiceUrl}/post`, invoice);
  }

  setInvoiceFormDisplayStatus(status: boolean) {
    this.storeService.setInvoiceFormDisplayStatus(status);
  }

}
