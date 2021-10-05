import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { InvoiceGetDto } from 'src/app/models/invoice';
import { UserGetDto } from 'src/app/models/user/userGetDto';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private token!: string | null;

  /* Loading Status  */
  private loadingStatus = new BehaviorSubject<boolean>(false);
  public readonly loadingStatus$ = this.loadingStatus.asObservable();
  /* Loading Status  */

  /** User properties */
  private userId!: string;

  private loggedUser = new Subject<UserGetDto>();
  public readonly loggedUser$ = this.loggedUser.asObservable();

  private userSignUpStatus = new BehaviorSubject<boolean>(false);
  public readonly userSignUpStatus$ = this.userSignUpStatus.asObservable();

  private loginStatus = new BehaviorSubject<boolean>(false);
  public readonly loginStatus$ = this.loginStatus.asObservable();

  private isConnected = new BehaviorSubject<boolean>(false);
  public readonly isConnected$ = this.isConnected.asObservable();

  //** Invoice properties */
  private isInvoiceFormIsDisplayed = new BehaviorSubject<boolean>(false);
  public readonly isInvoiceFormIsDisplayed$ = this.isInvoiceFormIsDisplayed.asObservable();

  private newInvoiceCreatedStatus = new BehaviorSubject<boolean>(false);
  public readonly newInvoiceCreatedStatus$ = this.newInvoiceCreatedStatus.asObservable();

  private invoices = new BehaviorSubject<InvoiceGetDto[] | undefined>(undefined);
  public readonly invoices$ = this.invoices.asObservable();

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

  //// INVOICE METHODS ////

  setInvoiceFormDisplayStatus(status: boolean) {
    this.isInvoiceFormIsDisplayed.next(status);
  }

  setNewInvoiceCreatedStatus(status: boolean) {
    this.newInvoiceCreatedStatus.next(status);
  }

  setInvoices(invoices: InvoiceGetDto[]) {
    this.invoices.next(invoices);
  }

  //// END INVOICE METHODS ////

  //// TOKEN METHODS ////

  setToken(token: string) {
    this.token = token;
  }

  registerToken(token: string) {
    localStorage.setItem("token", token)
  }

  getToken() {
    return this.token ? this.token : localStorage.getItem("token");
  }

  resetToken() {
    this.token = "";
    if (localStorage.getItem("token")) {
      localStorage.removeItem("token");
    }
  }

  //// TOKEN METHODS ////

  //// LOADING METHODS ////
  setLoadingStatus(status: boolean) {
    this.loadingStatus.next(status);
    console.log(status);
  }
  //// LOADING METHODS ////
}
