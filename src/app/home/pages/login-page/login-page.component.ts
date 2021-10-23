import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { StoreService } from 'src/app/core/services/store/store.service';
import { UserGetDto } from 'src/app/models/user/userGetDto';
import { LoadingSpinnerComponent } from 'src/app/shared/components/loading-spinner/loading-spinner.component';
import { SnackBarComponent } from 'src/app/shared/components/snack-bar/snack-bar.component';
import { AlertService } from 'src/app/shared/services/alert/alert.service';
import { CacheService } from 'src/app/shared/services/cache/cache.service';
import Utils from 'src/app/shared/utils';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  hasError: boolean = false;
  loginForm: FormGroup = this.fb.group({
    email: ['', [
      Validators.required,
      Validators.pattern(Utils.Regex.emailRegex)
    ]],
    password: ['', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(Utils.Regex.passwordRegex)
    ]],
  });

  constructor(private store: StoreService,
    private fb: FormBuilder,
    private authService: AuthService,
    private _snackBar: MatSnackBar,
    private alertService: AlertService,
    private cacheService: CacheService,
    private router: Router,
    private userService: UserService) { }

  ngOnInit(): void {

    this.store.userSignUpStatus$
      .subscribe((status: Boolean) => {
        if (status) {
          this.openSnackBar();
          this.userService.setUserSignUpStatus(false);
        }
      });

    this.store.expiredTokenStatus$
      .subscribe((status: Boolean) => {
        if (status) {
          this.authService.setExpiredTokenStatus(false);
          this.alertService.setMessage("Sorry but your session time expired. Please log in again", "info");
          this.openSnackBar();
        }
      });
  }

  openSnackBar() {
    this._snackBar.openFromComponent(SnackBarComponent, {
      duration: 2000
    });
  }

  showLoading() {
    this._snackBar.openFromComponent(LoadingSpinnerComponent);
  }

  onSubmit() {
    const { email, password } = this.loginForm.value;
    if (email && password) {
      this.showLoading();
      this.authService.login({ email, password })
        .subscribe((data: any) => {
          this._snackBar.dismiss();
          this.userService.setLoggedUser(data.user);
          this.authService.setToken(data.data);
          this.authService.setUserConnectionStatus(true);
          this.router.navigate(["/user-account/invoices"]);
        },
          ({ error }: HttpErrorResponse) => {
            if (!error.message) {
              this._snackBar.dismiss();
              this.alertService.setMessage("An server error occurs...", "error");
              this.authService.setUserConnectionStatus(false);
              this.openSnackBar();
              return;
            }
            this._snackBar.dismiss();
            this.alertService.setMessage(error.message, "error");
            this.authService.setUserConnectionStatus(false);
            this.openSnackBar();
          })
    }
  }

  wrongInput(controlName: string) {
    if (this.loginForm.get(controlName)?.status === "INVALID" && this.loginForm.get(controlName)?.touched) {
      return Utils.ErrorStyles.inputErrorStyle;
    }
    return null;
  }

  verifyInput(inputs: any) {
    this.hasError = false;
    for (const input in inputs) {
      if (inputs[input].trim() === "") {
        this.hasError = true;
      }
    }
  }

}
