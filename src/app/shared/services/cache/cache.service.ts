import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  constructor() { }

  setToken(data: any) {
    localStorage.setItem('token_id', data.token);
    localStorage.setItem('invoice-app_token_exp', data.exp);
    localStorage.setItem('invoice-app_token_iat', data.iat);
  }

  getToken() {
    return localStorage.getItem('token_id');
  }

  getTokenExp() {
    return +localStorage.getItem('invoice-app_token_exp')!;
  }

  removeToken() {
    localStorage.removeItem('token_id');
    localStorage.removeItem('invoice-app_token_exp');
    localStorage.removeItem('invoice-app_token_iat');
  }
}
