import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { HomeRoutingModule } from './home.routing.module';



@NgModule({
  declarations: [
    LoginPageComponent, SignUpComponent
  ],
  imports: [
    CommonModule, HomeRoutingModule
  ]
})
export class HomeModule { }
