import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { StoreService } from 'src/app/core/services/store/store.service';
import { UserService } from 'src/app/home/services/user.service';
import { InvoiceGetDto } from 'src/app/models/invoice';
import { ProfileImage } from 'src/app/models/picture/pictureDto';
import { UserGetDto } from 'src/app/models/user/userGetDto';
import { SnackBarComponent } from 'src/app/shared/components/snack-bar/snack-bar.component';
import { LoadingService } from 'src/app/shared/services/loading/loading.service';
import { InvoiceService } from '../../services/invoice.service';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.scss']
})
export class InvoiceListComponent implements OnInit {

  user!: UserGetDto;
  imageSrc: string = 'assets/camera.svg';
  invoices!: InvoiceGetDto[];
  isLoading: boolean = false;

  constructor(private invoiceService: InvoiceService,
              private storeService: StoreService,
              private route: ActivatedRoute,
              private router: Router,
              private _snackBar: MatSnackBar,
              private loadingService: LoadingService) {
      this.getInvoices();
      this.loadingService.setLoadingStatus(false);
  }

  ngOnInit(): void {
    this.storeService.loggedUser$
      .subscribe((user: UserGetDto | null) => {
        this.user = user!;
        if (this.user?.profileImage) {
          this.imageSrc = this.getProfileImage();
        }
      });

    this.storeService.newInvoiceCreatedStatus$
      .subscribe((status: boolean) => {
        if (status) {
          this.invoiceService.getInvoices();
          this.invoiceService.setNewInvoiceCreatedStatus(false);
        }
      });

    this.storeService.invoiceUpdatedStatus$
      .subscribe((status: boolean) => {
        if (status) {
          this.invoiceService.getInvoices();
          this.invoiceService.setInvoiceUpdatedStatus(false);
        }
      });

    this.storeService.loadingStatus$
      .subscribe((status: boolean) => {
        this.isLoading = status;
      });

    this.storeService.invoices$
      .subscribe((invoices: InvoiceGetDto[] | undefined) => {
        if (invoices) {
          this.invoices = invoices;
        }
        this.loadingService.setLoadingStatus(false);
      });

    this.storeService.invoiceDeletionStatus$
      .subscribe((status: boolean) => {
        if (status) {
          this.invoiceService.setInvoiceDeletionStatus(false);
          this.loadingService.setLoadingStatus(false);
          this.openSnackBar();
        }
      });

    this.storeService.invoiceStateStatus$
      .subscribe((status: boolean) => {
        if (status) {
          this.invoiceService.setInvoiceStateStatus(false);
          this.loadingService.setLoadingStatus(false);
          this.openSnackBar();
        }
      });
  }

  openSnackBar() {
    this._snackBar.openFromComponent(SnackBarComponent, {
      duration: 2000
    });
  };

  getInvoice(invoiceId: string) {
    this.loadingService.setLoadingStatus(true);
    this.invoiceService.setCurrentInvoiceId(invoiceId);
    this.invoiceService.setCurrentInvoice(invoiceId);
    this.router.navigate([invoiceId], {relativeTo: this.route});
  }

  getInvoices() {
    this.loadingService.setLoadingStatus(true);
    this.invoiceService.getInvoices();
  }

  openInvoiceForm() {
    this.invoiceService.setInvoiceFormDisplayStatus(true);
  }

  getProfileImage(): string {
    if (this.user.profileImage) {
      this.imageSrc = `http://localhost:3200/images/${this.user.profileImage.filename}`;
    }
    return this.imageSrc;
  }

}
