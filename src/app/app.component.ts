import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { StoreService } from './core/services/store/store.service';
import { InvoiceFormService } from './user-account/services/invoice-form.service';

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
        opacity: 1,
        pointerEvents: 'all'
      })),
      transition('show <=> hide', animate(350)),
    ])
  ],
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isConnected: boolean = false;
  displayStatus: string = 'hide';
  constructor(private storeService: StoreService,
              private invoiceFormService: InvoiceFormService) {}

  ngOnInit() {
    this.storeService.isConnected$
      .subscribe((isConnected) => {
          this.isConnected = isConnected;
      })

    this.storeService.isInvoiceFormIsDisplayed$
      .subscribe((displayStatus) => {
        this.displayStatus = displayStatus ? 'show' : 'hide';
      })
  }

  closeInvoiceForm() {
    this.invoiceFormService.setInvoiceFormDisplayStatus(false);
  }

}
