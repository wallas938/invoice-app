import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/core/services/store/store.service';
import { InvoiceFormService } from '../../services/invoice-form.service';

@Component({
  selector: 'app-invoice-form',
  templateUrl: './invoice-form.component.html',
  animations: [
    trigger("formState", [
      state('close', style({
        opacity: '0',
        //transform: 'translateX(-500px)'
      })),
      state('open', style({
        opacity: '1'

      })),
      transition('close <=> open', animate(350)),
    ])
  ],
  styleUrls: ['./invoice-form.component.scss']
})
export class InvoiceFormComponent implements OnInit {

  displayStatus: string = 'close';

  constructor(private storeService: StoreService,
              private invoiceFormService: InvoiceFormService) { }

  ngOnInit(): void {
    this.storeService.isInvoiceFormIsDisplayed$
      .subscribe((displayStatus) => {
        this.displayStatus = displayStatus ? 'open' : 'close';
      })
  }

  closeInvoiceForm() {
    this.invoiceFormService.setInvoiceFormDisplayStatus(false);
  }

}
