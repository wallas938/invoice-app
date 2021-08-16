import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './login-page/login-page.component';
import { SignUpComponent } from './sign-up/sign-up.component';



@NgModule({
  declarations: [
    LoginPageComponent, SignUpComponent
  ],
  imports: [
    CommonModule
  ]
})
export class HomeModule { }
