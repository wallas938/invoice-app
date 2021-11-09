import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SnackBarComponent } from './components/snack-bar/snack-bar.component';
import { ShortenPipe } from './pipes/shorten.pipe';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { ConvertDatePipe } from './pipes/convert-date.pipe';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { LoadingStripeComponent } from './components/loading-stripe/loading-stripe.component';
import { AutofocusDirective } from './directives/autoFocus';

@NgModule({
  declarations: [
    HeaderComponent,
    SnackBarComponent,
    ShortenPipe,
    ConvertDatePipe,
    LoadingSpinnerComponent,
    LoadingStripeComponent,
    AutofocusDirective
  ],
  imports: [
    CommonModule, ReactiveFormsModule, HttpClientModule,
    MatSnackBarModule, MatProgressSpinnerModule
  ],
  exports: [
    ShortenPipe, ConvertDatePipe, HeaderComponent,
    ReactiveFormsModule, MatSnackBarModule, MatProgressSpinnerModule,
    LoadingSpinnerComponent, LoadingStripeComponent, AutofocusDirective
  ]
})
export class SharedModule { }
