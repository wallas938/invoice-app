import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  constructor() { }

  setToken(token: string) {
    localStorage.setItem('token_id', token);
  }

  getToken() {
    return localStorage.getItem('token_id');
  }
}
