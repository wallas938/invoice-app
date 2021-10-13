import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/core/services/store/store.service';
import { InvoiceGetDto } from 'src/app/models/invoice';

@Component({
  selector: 'app-invoice-detail',
  templateUrl: './invoice-detail.component.html',
  styleUrls: ['./invoice-detail.component.scss']
})
export class InvoiceDetailComponent implements OnInit {
  currentInvoice: InvoiceGetDto | undefined
  constructor(private storeService: StoreService) { }

  ngOnInit(): void {

    this.storeService.currentInvoice$
      .subscribe((currentInvoice: InvoiceGetDto | undefined) => {
        this.currentInvoice = currentInvoice;
      });
  }

}
