import { Resolve,ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

//// Services ////
import { StoreService } from "src/app/core/services/store/store.service";
import { InvoiceService } from "src/app/user-account/services/invoice.service";

@Injectable()
export class InvoiceResolver implements Resolve<any> {
  constructor(private invoiceService: InvoiceService,
              private store: StoreService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.invoiceService.getInvoice(this.store.getCurrentInvoiceId());
  }
}
