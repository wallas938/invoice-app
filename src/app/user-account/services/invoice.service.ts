import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { StoreService } from 'src/app/core/services/store/store.service';
import { DraftedInvoiceDto, InvoiceCreateDto, InvoiceUpdateDto } from 'src/app/models/invoice';

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

  saveDraftedInvoice(invoice: DraftedInvoiceDto) {
    return this.http.post(`${this.invoiceUrl}/post/drafted`, invoice);
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

  markAsPaid(invoiceId: string) {
    return this.http.patch(`${this.invoiceUrl}/${invoiceId}/status`, { status: 'Paid' });
  }

  getInvoices() {
    return this.http.get(`${this.invoiceUrl}`)
      .subscribe((data: any) => {
        this.storeService.setInvoices(data.invoices);
      });
  }

  updateInvoices(data: { draft: string, pending: string, paid: string }) {
    return this.http.get(`${this.invoiceUrl}/filter?draft=${data.draft}&pending=${data.pending}&paid=${data.paid}`)
      .subscribe((data: any) => {
        this.storeService.setInvoices(data.invoices);
      });
  }

  /** Setters */

  setInvoiceFormDisplayStatus(status: boolean) {
    this.storeService.setInvoiceFormDisplayStatus(status);
  }

  setDeletePromptDisplayStatus(status: boolean) {
    this.storeService.setDeletePromptDisplayStatus(status);
  }

  setNewInvoiceCreatedStatus(status: boolean) {
    this.storeService.setNewInvoiceCreatedStatus(status);
  }

  setDraftedInvoiceStatus(status: boolean) {
    this.storeService.setDraftedInvoiceStatus(status);
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

  setInvoiceStateStatus(status: boolean) {
    this.storeService.setInvoiceStateStatus(status);
  }

  setFilterDisplayStatus(status: boolean) {
    this.storeService.setFilterDisplayStatus(status);
  }

  setInvoiceDeletionConfirmationStatus(status: boolean) {
    this.storeService.setInvoiceDeletionConfirmationStatus(status);
  }

}
