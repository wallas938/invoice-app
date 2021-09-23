import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { StoreService } from 'src/app/core/services/store/store.service';
import { UserGetDto } from 'src/app/models/user/userGetDto';
import { InvoiceFormService } from 'src/app/user-account/services/invoice-form.service';
import { CacheService } from '../../services/cache/cache.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  profileImage: string = "assets/image-avatar.jpg"
  user!: UserGetDto;
  isConnected: boolean = false;
  constructor(private store: StoreService,
              private cacheService: CacheService,
              private authService: AuthService,
              private invoiceFormService: InvoiceFormService,
              private router: Router) { }

  ngOnInit(): void {
    this.store.loggedUser$
      .subscribe((user: UserGetDto | null) => {
        this.user = user!;
        if (this.user?.profileImage) {
          this.profileImage = `http://localhost:3200/images/${this.user.profileImage.filename}`;
          return;
        }

        this.profileImage = "assets/image-avatar.jpg";
      });

      this.store.isConnected$
          .subscribe((isConnected: boolean) => {
              this.isConnected = isConnected;
          })
  }

  closeInvoiceForm() {
    this.invoiceFormService.setInvoiceFormDisplayStatus(false);
  }

  logout() {
    this.closeInvoiceForm();
    setTimeout(() => {
      this.cacheService.removeToken();
      this.authService.setUserConnectionStatus(false);
      this.router.navigate(['/home']);
    }, 400);
  }
}
