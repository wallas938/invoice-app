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
import { CacheService } from '../shared/services/cache/cache.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private storeService: StoreService,
              private cacheService: CacheService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if(this.cacheService.getToken()) {

      const token = this.cacheService.getToken();

      const headers = new HttpHeaders({
        "Authorization": "Bearer " + token!,
      });

      const clone = request.clone({ headers });

      return next.handle(clone);
    }
    return next.handle(request);
  }
}
