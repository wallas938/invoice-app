import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreService } from './services/store/store.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './TokenInterceptor';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [StoreService, 
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
  }]
})
export class CoreModule { }
