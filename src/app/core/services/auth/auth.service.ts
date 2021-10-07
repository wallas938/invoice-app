import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginCredentials } from 'src/app/models/login/loginDto';
import { UserGetDto } from 'src/app/models/user/userGetDto';
import { CacheService } from 'src/app/shared/services/cache/cache.service';
import { StoreService } from '../store/store.service';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authUrl = "http://localhost:3200/auth"

  constructor(private http: HttpClient,
    private storeService: StoreService,
    private cacheService: CacheService) { }

  login(data: LoginCredentials) {
    return this.http.post(`${this.authUrl}`, data, { responseType: 'json' })
  }

  autoLogin() {
    return this.http.get(`${this.authUrl}/${this.cacheService.getToken()}`, { responseType: 'json' })
  }

  setUserConnectionStatus(status: boolean) {
    this.storeService.setLoginStatus(status);
    this.storeService.setUserConnectionStatus(status);
  }

  setToken(data: any) {
    this.storeService.setToken(data);
    this.cacheService.setToken(data);
  }

  setExpiredTokenStatus(status: boolean) {
    this.storeService.setExpiredTokenStatus(status);
    if (status) {
      this.cacheService.removeToken();
    }
  }
}
