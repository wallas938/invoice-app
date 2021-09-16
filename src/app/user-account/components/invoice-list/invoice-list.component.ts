import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { StoreService } from 'src/app/core/services/store/store.service';
import { UserService } from 'src/app/home/services/user.service';
import { ProfileImage } from 'src/app/models/picture/pictureDto';
import { UserGetDto } from 'src/app/models/user/userGetDto';
import { InvoiceFormService } from '../../services/invoice-form.service';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.scss']
})
export class InvoiceListComponent implements OnInit {

  user!: UserGetDto;
  imageSrc: string = 'assets/camera.svg';

  constructor(private userService: UserService,
              private invoiceFormService: InvoiceFormService,
              private storeService: StoreService) { }

  ngOnInit(): void {
    this.storeService.loggedUser$
      .subscribe((user: UserGetDto | null) => {
        this.user = user!;
        if (this.user?.profileImage) {
          this.imageSrc = this.getProfileImage();
        }
      })
  }

  openInvoiceForm() {
    this.invoiceFormService.setInvoiceFormDisplayStatus(true);
  }

  getProfileImage(): string {
    if (this.user.profileImage) {
      this.imageSrc = `http://localhost:3200/images/${this.user.profileImage.filename}`;
    }
    return this.imageSrc;
  }

}
