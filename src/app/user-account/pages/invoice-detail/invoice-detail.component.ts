import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { StoreService } from 'src/app/core/services/store/store.service';
import { InvoiceGetDto } from 'src/app/models/invoice';
import { SnackBarComponent } from 'src/app/shared/components/snack-bar/snack-bar.component';
import { AlertService } from 'src/app/shared/services/alert/alert.service';
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
    private _router: Router,
    private route: ActivatedRoute,
    private loadingService: LoadingService,
    private alertService: AlertService,
    private _snackBar: MatSnackBar) {
    this.loadingService.setLoadingStatus(false);
  }

  ngOnInit(): void {
    this.route.data.subscribe(
      (resolverData: Data) => {
        let { invoice }: any = resolverData['invoiceDetail'];
        this.currentInvoice = invoice;
      }
    )

    this.storeService.invoiceDeletionStatus$
      .subscribe((status: boolean) => {
        if (status) {
          this._router.navigate(['..'], { relativeTo: this.route });
        }
      })

    this.storeService.invoiceUpdatedStatus$
      .subscribe((status: boolean) => {
        if (status) {
          this._router.navigate(['..'], { relativeTo: this.route });
        }
      })

    this.storeService.invoiceStateStatus$
      .subscribe((status: boolean) => {
        if (status) {
          this._router.navigate(['..'], { relativeTo: this.route });
        }
      })
  }

  onEdit(invoiceId: string) {
    this.invoiceService.setInvoiceEditionMode(true);
    this.invoiceService.setCurrentInvoiceId(invoiceId);
    this.invoiceService.setInvoiceFormDisplayStatus(true);
  }

  onDelete(invoiceId: string) {
    this.loadingService.setLoadingStatus(true);
    this.invoiceService.deleteInvoice(invoiceId)
      .subscribe((result: any) => {
        this.alertService.setMessage(result.message, "success");
        this.invoiceService.setInvoiceDeletionStatus(true);
      },
        ({ error }: HttpErrorResponse) => {
          if (!error.message) {
            this.alertService.setMessage("An server error occurs...", "error");
            this.invoiceService.setInvoiceDeletionStatus(false);
            this.loadingService.setLoadingStatus(false);
            this.openSnackBar();
            return;
          }
          this.alertService.setMessage(error.message, "error");
          this.invoiceService.setInvoiceDeletionStatus(false);
          this.loadingService.setLoadingStatus(false);
          this.openSnackBar();
        })
  }

  onMarkAsPaid(invoiceId: string) {
    this.loadingService.setLoadingStatus(true);
    this.invoiceService.markAsPaid(invoiceId)
      .subscribe((result: any) => {
        this.alertService.setMessage(result.message, "success");
        this.invoiceService.setInvoiceStateStatus(true);
      }, ({ error }: HttpErrorResponse) => {
        if (!error.message) {
          this.alertService.setMessage("An server error occurs...", "error");
          this.invoiceService.setInvoiceStateStatus(false);
          this.loadingService.setLoadingStatus(false);
          this.openSnackBar();
          return;
        }
        this.alertService.setMessage(error.message, "error");
        this.invoiceService.setInvoiceStateStatus(false);
        this.loadingService.setLoadingStatus(false);
        this.openSnackBar();
      })
  }

  openSnackBar() {
    this._snackBar.openFromComponent(SnackBarComponent, {
      duration: 2000
    });
  };
}
