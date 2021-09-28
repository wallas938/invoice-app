import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { StoreService } from 'src/app/core/services/store/store.service';
import { UserService } from 'src/app/home/services/user.service';
import { InvoiceGetDto } from 'src/app/models/invoice';
import { ProfileImage } from 'src/app/models/picture/pictureDto';
import { UserGetDto } from 'src/app/models/user/userGetDto';
import { InvoiceService } from '../../services/invoice.service';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.scss']
})
export class InvoiceListComponent implements OnInit {

  user!: UserGetDto;
  imageSrc: string = 'assets/camera.svg';
  invoices: InvoiceGetDto[] = [];

  constructor(private invoiceService: InvoiceService,
    private storeService: StoreService) { }

  ngOnInit(): void {
    this.invoiceService.getInvoices();

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


    this.storeService.invoices$
      .subscribe((invoices: InvoiceGetDto[]) => {
        this.invoices = invoices;
        console.log(invoices);

      })
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
