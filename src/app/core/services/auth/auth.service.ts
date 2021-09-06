import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginCredentials } from 'src/app/models/login/loginDto';
import { CacheService } from 'src/app/shared/services/cache/cache.service';
import { StoreService } from '../store/store.service';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userUrl = "http://localhost:3200/auth"

  constructor(private http: HttpClient,
              private store: StoreService,
              private cacheService: CacheService) { }

  login(data: LoginCredentials) {
    return this.http.post(`${this.userUrl}`, data, { responseType: 'json' })
  }

  setLoginStatus(status: boolean) {
    this.store.setLoginStatus(status);
    this.store.setUserConnectionStatus(status);
  }

  setToken(token: string) {
    this.store.setToken(token);
    this.cacheService.setToken(token);
  }
}
