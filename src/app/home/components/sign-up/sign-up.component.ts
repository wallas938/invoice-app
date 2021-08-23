import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Utils  from '../../../shared/utils/index';
import { UserCreateDto }  from '../../../models/user/userCreateDto';
import { UserService } from '../../services/user.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { SnackBarComponent } from 'src/app/shared/components/snack-bar/snack-bar.component';
import { AlertService } from 'src/app/shared/services/alert.service';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  inputError: boolean = false;

  signUpForm: FormGroup = this.fb.group({
    firstName: ['', [
      Validators.required,
      Validators.minLength(2)
    ]],
    lastName: ['', [
      Validators.required,
      Validators.minLength(2)
    ]],
    profileImage: [''],
    email: ['', [
      Validators.required,
      Validators.pattern(Utils.Regex.emailRegex)
    ]],
    phoneNumber: ['', [
      Validators.required,
      Validators.minLength(10),
      Validators.min(0)
    ]],
    street: ['', [
      Validators.required,
      Validators.minLength(10)
    ]],
    city: ['', [
      Validators.required,
      Validators.minLength(5)
    ]],
    postCode: ['', [
      Validators.required,
      Validators.minLength(3)
    ]],
    country: ['', [
      Validators.required,
      Validators.minLength(5)
    ]],
    password: ['', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(Utils.Regex.passwordRegex)
    ]],
    confirmedPassword: ['', [
      Validators.required,
      Validators.pattern(Utils.Regex.passwordRegex)
    ]]
  });

  constructor(private fb: FormBuilder, 
    private userService: UserService,
    private _snackBar: MatSnackBar,
    private alertService: AlertService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    const data: UserCreateDto = {
      firstName: this.signUpForm.get('firstName')?.value.trim(),
      lastName: this.signUpForm.get('lastName')?.value.trim(),
      profileImage: null,
      email: this.signUpForm.get('email')?.value.trim(),
      phoneNumber: this.signUpForm.get('phoneNumber')?.value.trim(),
      street: this.signUpForm.get('street')?.value.trim(),
      city: this.signUpForm.get('city')?.value.trim(),
      postCode: this.signUpForm.get('postCode')?.value.trim(),
      country: this.signUpForm.get('country')?.value.trim(),
      password: this.signUpForm.get('password')?.value.trim()
    };
    console.log(data);
    
    this.verifyInput(data);

    if (!this.inputError) {
      this.userService.saveUser(data)
        .subscribe((result) => {
          console.log(result);
        });
    } else {
      this.alertService.setMessage('One or many of the entered inputs is wrong!', 'error');
      this.openSnackBar();
    }
  }

  verifyInput(inputs: any) {
    this.inputError = false;
    for (const input in inputs) {
      if (input !== 'profileImage') {
        if (inputs[input] === "") {
          this.inputError = true;
        }
      }
    }
  }

  openSnackBar() {
    this._snackBar.openFromComponent(SnackBarComponent, {
      duration: 2000
    });
  }

  clearForm() {
    this.signUpForm.reset();
  }

  wrongInput(controlName: string) {
    if (this.signUpForm.get(controlName)?.status === "INVALID" && this.signUpForm.get(controlName)?.touched) {
      return Utils.ErrorStyles.inputErrorStyle;
    }
    return null;
  }

  verifyPassword() {
    if ((this.signUpForm.get('confirmedPassword')?.value === 
        this.signUpForm.get('password')?.value) ||
        this.signUpForm.get('confirmedPassword')?.untouched) {
      return true;
    }
    return false;
  }
}
