import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { StoreService } from 'src/app/core/services/store/store.service';
import { UserGetDto } from 'src/app/models/user/userGetDto';
import { InvoiceService } from 'src/app/user-account/services/invoice.service';
import { CacheService } from '../../services/cache/cache.service';
import { SwitchService } from '../../services/switch/switch.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  profileImage: string = "assets/image-avatar.jpg"
  darkIcon: string = "assets/icon-moon.svg";
  lightIcon: string = "assets/icon-sun.svg";
  user!: UserGetDto;
  isDarkTheme: boolean = false;
  isConnected: boolean = false;

  constructor(private store: StoreService,
    private cacheService: CacheService,
    private authService: AuthService,
    private invoiceService: InvoiceService,
    private switchService: SwitchService,
    private router: Router) { }

  ngOnInit(): void {
    this.store.switchStatus$
      .subscribe((status: boolean) => {
        this.isDarkTheme = status;
      })

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

  logout() {
    this.closeModals();
    setTimeout(() => {
      this.cacheService.removeToken();
      this.authService.setUserConnectionStatus(false);

      this.router.navigate(['/home']);
    }, 400);
  }

  closeModals() {
    this.invoiceService.setInvoiceFormDisplayStatus(false);
    this.invoiceService.setInvoiceEditionMode(false);
    this.invoiceService.setDeletePromptDisplayStatus(false);
    this.invoiceService.setInvoiceDeletionConfirmationStatus(false);
  }

  switchTheme() {
    this.switchService.setSwitchStatus(!this.isDarkTheme);
  }
}
