import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { StoreService } from 'src/app/core/services/store/store.service';
import { InvoiceGetDto } from 'src/app/models/invoice';
import { LoadingService } from 'src/app/shared/services/loading/loading.service';
import { InvoiceService } from '../../services/invoice.service';

@Component({
  selector: 'app-invoice-detail',
  templateUrl: './invoice-detail.component.html',
  styleUrls: ['./invoice-detail.component.scss']
})
export class InvoiceDetailComponent implements OnInit {
  currentInvoice: InvoiceGetDto | undefined
  constructor(private storeService: StoreService,
    private invoiceService: InvoiceService,
    private router: Router,
    private route: ActivatedRoute,
    private loadingService: LoadingService) { }

  ngOnInit(): void {
    this.storeService.currentInvoice$
      .subscribe((currentInvoice: InvoiceGetDto | undefined) => {
        this.currentInvoice = currentInvoice;
      });
  }

  onEdit(invoiceId: string) {
    this.invoiceService.setInvoiceEditionMode(true);
    this.invoiceService.setCurrentInvoice(invoiceId);
    this.invoiceService.setInvoiceFormDisplayStatus(true);
  }

}
