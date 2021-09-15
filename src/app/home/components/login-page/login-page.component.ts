import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { StoreService } from 'src/app/core/services/store/store.service';
import { UserGetDto } from 'src/app/models/user/userGetDto';
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
          console.log("No user Token");
        })

    }

    this.store.userSignUpStatus$
      .subscribe((status: Boolean) => {
        if (status) {
          this.openSnackBar();
          this.userService.setUserSignUpStatus(false);
        }
      });
  }

  openSnackBar() {
    this._snackBar.openFromComponent(SnackBarComponent, {
      duration: 2000
    });
  }

  onSubmit() {
    const { email, password } = this.loginForm.value;
    if (email && password) {
      this.authService.login({ email, password })
        .subscribe((data: any) => {
          console.log(data);
          this.userService.setLoggedUser(data.user);
          this.authService.setUserConnectionStatus(true);
          this.authService.setToken(data.token);
          this.router.navigate(["/user-account"]);
        },
          ({ error }: HttpErrorResponse) => {
            if (!error.message) {
              this.alertService.setMessage("An server error occurs...", "error");
              this.authService.setUserConnectionStatus(false);
              this.openSnackBar();
              return;
            }
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
