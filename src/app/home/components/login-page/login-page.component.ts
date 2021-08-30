import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StoreService } from 'src/app/core/service/store/store.service';
import { SnackBarComponent } from 'src/app/shared/components/snack-bar/snack-bar.component';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  constructor(private store: StoreService,
              private _snackBar: MatSnackBar,
              private userService: UserService) { }

  ngOnInit(): void {
    this.store.userSignUpStatus$
      .subscribe((status: boolean) => {
        if (status) {
          this.openSnackBar();
          this.userService.setUserSignUpStatus(false);
        }
      })
  }

  openSnackBar() {
    this._snackBar.openFromComponent(SnackBarComponent, {
      duration: 2000
    });
  }

}
