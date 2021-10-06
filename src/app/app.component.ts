import { animate, state, style, transition, trigger } from '@angular/animations';
import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './core/services/auth/auth.service';
import { StoreService } from './core/services/store/store.service';
import { UserService } from './home/services/user.service';
import { CacheService } from './shared/services/cache/cache.service';
import { LoadingService } from './shared/services/loading/loading.service';
import { InvoiceService } from './user-account/services/invoice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  animations: [
    trigger("formBackDropState", [
      transition('void => *', [
        style({
          opacity: '0'
        }),
        animate(0, style({
          opacity: '1'
        }))
      ]),
      transition('* => void', [
        animate(350, style({
          opacity: '0'
        }))
      ]),
    ])
  ],
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isConnected: boolean = false;
  /* displayStatus: string = 'hide'; */
  displayStatus: boolean = false;
  isLoading: boolean = false;
  constructor(private storeService: StoreService,
              private invoiceService: InvoiceService,
              private loadingService: LoadingService,
              private cacheService: CacheService,
              private authService: AuthService,
              private userService: UserService,
              private router: Router) {
              }

  ngOnInit() {

    this.storeService.isConnected$
      .subscribe((isConnected) => {
        this.isConnected = isConnected;
      });

    this.storeService.isInvoiceFormIsDisplayed$
      .subscribe((displayStatus) => {
        /* this.displayStatus = displayStatus ? 'show' : 'hide'; */
        this.displayStatus = displayStatus;
      });

    this.storeService.loadingStatus$
      .subscribe((status: boolean) => {
        this.isLoading = status;
      });
  }

  autoLogin() {
    if (this.cacheService.getToken()) {
      this.authService.autoLogin()
        .subscribe((data: any) => {
          if (data.user) {
            this.userService.setLoggedUser(data.user);
            this.authService.setUserConnectionStatus(true);
            this.router.navigate(["/user-account"]);
            return;
          }
          this.authService.setUserConnectionStatus(false);
          this.router.navigate(["/home"]);
        },
          ({ error }: HttpErrorResponse) => {
          })
    }
  }

  closeInvoiceForm() {
    this.invoiceService.setInvoiceFormDisplayStatus(false);
  }

}
