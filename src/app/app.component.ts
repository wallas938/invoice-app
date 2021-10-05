import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { StoreService } from './core/services/store/store.service';
import { LoadingService } from './shared/services/loading/loading.service';
import { InvoiceService } from './user-account/services/invoice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  animations: [
    trigger("formBackDropState", [
      state('hide', style({
        opacity: 0,
        pointerEvents: 'none'
      })),
      state('show', style({
        opacity: 1
      })),
      transition('show <=> hide', animate(350)),
    ])
  ],
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isConnected: boolean = false;
  displayStatus: string = 'hide';
  isLoading: boolean = false;
  constructor(private storeService: StoreService,
    private invoiceService: InvoiceService,
    private loadingService: LoadingService) { }

  ngOnInit() {
    this.storeService.isConnected$
      .subscribe((isConnected) => {
        this.isConnected = isConnected;
      });

    this.storeService.isInvoiceFormIsDisplayed$
      .subscribe((displayStatus) => {
        this.displayStatus = displayStatus ? 'show' : 'hide';
      });

    this.storeService.loadingStatus$
      .subscribe((status: boolean) => {
        this.isLoading = status;
      });
  }

  closeInvoiceForm() {
    this.invoiceService.setInvoiceFormDisplayStatus(false);
  }

}
