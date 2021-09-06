import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserGetDto } from 'src/app/models/user/userGetDto';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private token!: string | null;

  /** User properties */
  private userId!: string;

  private loggedUser = new BehaviorSubject<UserGetDto | null>(null);
  public readonly loggedUser$ = this.loggedUser.asObservable();

  private userSignUpStatus = new BehaviorSubject(false);
  public readonly userSignUpStatus$ = this.userSignUpStatus.asObservable();

  private loginStatus = new BehaviorSubject(false);
  public readonly loginStatus$ = this.loginStatus.asObservable();

  private isConnected = new BehaviorSubject(false);
  public readonly isConnected$ = this.isConnected.asObservable();

  constructor() { }

  //// USER METHODS////
  setUserSignUpStatus(status: boolean) {
    this.userSignUpStatus.next(status);
  }

  setLoginStatus(status: boolean) {
    this.loginStatus.next(status);
  }

  setUserConnectionStatus(status: boolean) {
    this.isConnected.next(status);
  }

  setLoggedUser(loggedUser: UserGetDto) {
    this.loggedUser.next(loggedUser)
  }

  setUserId(id: string) {
    this.userId = id;
  }

  getUserId() {
    return this.userId;
  }
  //// END USER METHODS ////

  //// TOKEN METHODS ////

  setToken(token: string) {
    this.token = token;
  }

  registerToken(token: string) {
    localStorage.setItem("token", token)
  }

  getToken() {
    return this.token ? this.token : localStorage.getItem("token") ? localStorage.getItem("token") : null;
  }

  resetToken() {
    this.token = "";
    if (localStorage.getItem("token")) {
      localStorage.removeItem("token");
    }
  }
}
