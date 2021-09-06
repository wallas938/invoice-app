import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { StoreService } from './services/store/store.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private store: StoreService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    if(this.store.getToken()) {
      
      const token = this.store.getToken();

      const headers = new HttpHeaders({
        "Authorization": "Bearer " + token!,
      });

      const clone = request.clone({ headers });
      
      return next.handle(clone);
    } 
    return next.handle(request);
  }
}
