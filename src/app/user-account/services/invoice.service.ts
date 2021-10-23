import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StoreService } from 'src/app/core/services/store/store.service';
import { InvoiceCreateDto, InvoiceUpdateDto } from 'src/app/models/invoice';

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

  getInvoice(invoiceId: string) {
    return this.http.get(`${this.invoiceUrl}/${invoiceId}`);
  }

  editInvoice(invoice: InvoiceUpdateDto) {
    return this.http.put(`${this.invoiceUrl}/${invoice._id}`, invoice);
  }

  deleteInvoice(invoiceId: string) {
    return this.http.delete(`${this.invoiceUrl}/${invoiceId}`);
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

  setInvoiceUpdatedStatus(status: boolean) {
    this.storeService.setInvoiceUpdatedStatus(status);
  }

  setCurrentInvoiceId(id: string) {
    this.storeService.setCurrentInvoiceId(id);
  }

  setCurrentInvoice(id: string) {
    this.storeService.setCurrentInvoice(id);
  }

  setInvoiceEditionMode(status: boolean) {
    this.storeService.setInvoiceEditionMode(status);
  }

  setInvoiceDeletionStatus(status: boolean) {
    this.storeService.setInvoiceDeletionStatus(status);
  }

}
