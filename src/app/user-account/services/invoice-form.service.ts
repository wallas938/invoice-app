import { Injectable } from '@angular/core';
import { StoreService } from 'src/app/core/services/store/store.service';

@Injectable({
  providedIn: 'root'
})
export class InvoiceFormService {

  constructor(private storeService: StoreService) { }

  setInvoiceFormDisplayStatus(status: boolean) {
    this.storeService.setInvoiceFormDisplayStatus(status);
  }

}
