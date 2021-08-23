import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SnackBarComponent } from './components/snack-bar/snack-bar.component';


@NgModule({
  declarations: [
    HeaderComponent,
    SnackBarComponent
  ],
  imports: [
    CommonModule, ReactiveFormsModule, HttpClientModule, MatSnackBarModule
  ],
  exports: [
    HeaderComponent, ReactiveFormsModule, MatSnackBarModule
  ]
})
export class SharedModule { }
