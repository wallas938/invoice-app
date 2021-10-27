import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeModule } from './home/home.module';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { InvoiceFormComponent } from './user-account/pages/invoice-form/invoice-form.component';
import { DeletePromptComponent } from './user-account/pages/invoice-detail/components/delete-prompt/delete-prompt.component';

@NgModule({
  declarations: [
    AppComponent,
    InvoiceFormComponent,
    DeletePromptComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    HomeModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
