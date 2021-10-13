import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StoreService } from 'src/app/core/services/store/store.service';
import { InvoiceCreateDto } from 'src/app/models/invoice';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  private invoiceUrl = "http://localhost:3200/invoices"

  constructor(private http: HttpClient,
              private storeService: StoreService) { }

  saveInvoice(invoice: InvoiceCreateDto) {
    return this.http.post(`${this.invoiceUrl}/post`, invoice);
  }

  getInvoices() {
    return this.http.get(`${this.invoiceUrl}`)
            .subscribe((data: any) => {
              this.storeService.setInvoices(data.invoices);
            });
  }

  setInvoiceFormDisplayStatus(status: boolean) {
    this.storeService.setInvoiceFormDisplayStatus(status);
  }

  setNewInvoiceCreatedStatus(status: boolean) {
    this.storeService.setNewInvoiceCreatedStatus(status);
  }

  setCurrentInvoice(id: string) {
    this.storeService.setCurrentInvoice(id);
  }



}
