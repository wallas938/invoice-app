import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { InvoiceGetDto } from 'src/app/models/invoice';
import { UserGetDto } from 'src/app/models/user/userGetDto';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  /** Token properties */
  private token!: string | null;

  private expiredTokenStatus = new BehaviorSubject<boolean>(false);
  public readonly expiredTokenStatus$ = this.expiredTokenStatus.asObservable();

  /** Token properties */

  /* Loading Status  */
  private loadingStatus = new BehaviorSubject<boolean>(false);
  public readonly loadingStatus$ = this.loadingStatus.asObservable();
  /* Loading Status  */

  /* Switch Status  */
  private switchStatus = new BehaviorSubject<boolean>(false);
  public readonly switchStatus$ = this.switchStatus.asObservable();
  /* Switch Status  */

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
  private isInvoiceFormDisplayed = new BehaviorSubject<boolean>(false);
  public readonly isInvoiceFormDisplayed$ = this.isInvoiceFormDisplayed.asObservable();

  private deletePromptDisplayStatus = new BehaviorSubject<boolean>(false);
  public readonly deletePromptDisplayStatus$ = this.deletePromptDisplayStatus.asObservable();

  private filterDisplayStatus = new BehaviorSubject<boolean>(false);
  public readonly filterDisplayStatus$ = this.filterDisplayStatus.asObservable();

  private invoiceDeletionConfirmationStatus = new BehaviorSubject<boolean>(false);
  public readonly invoiceDeletionConfirmationStatus$ = this.invoiceDeletionConfirmationStatus.asObservable();

  private newInvoiceCreatedStatus = new BehaviorSubject<boolean>(false);
  public readonly newInvoiceCreatedStatus$ = this.newInvoiceCreatedStatus.asObservable();

  private draftedInvoiceStatus = new BehaviorSubject<boolean>(false);
  public readonly draftedInvoiceStatus$ = this.draftedInvoiceStatus.asObservable();

  private invoiceUpdatedStatus = new BehaviorSubject<boolean>(false);
  public readonly invoiceUpdatedStatus$ = this.invoiceUpdatedStatus.asObservable();

  private invoiceEditionMode = new BehaviorSubject<boolean>(false);
  public readonly invoiceEditionMode$ = this.invoiceEditionMode.asObservable();

  private invoiceDeletionStatus = new BehaviorSubject<boolean>(false);
  public readonly invoiceDeletionStatus$ = this.invoiceDeletionStatus.asObservable();

  private invoiceStateStatus = new BehaviorSubject<boolean>(false);
  public readonly invoiceStateStatus$ = this.invoiceStateStatus.asObservable();

  private invoices = new BehaviorSubject<InvoiceGetDto[] | undefined>(undefined);
  public readonly invoices$ = this.invoices.asObservable();

  private currentInvoiceId = new BehaviorSubject<string | undefined>(undefined);
  public readonly currentInvoiceId$ = this.currentInvoiceId.asObservable();

  private currentInvoice = new BehaviorSubject<InvoiceGetDto | undefined>(undefined);
  public readonly currentInvoice$ = this.currentInvoice.asObservable();

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
    this.isInvoiceFormDisplayed.next(status);
  }

  setDeletePromptDisplayStatus(status: boolean) {
    this.deletePromptDisplayStatus.next(status);
  }

  setNewInvoiceCreatedStatus(status: boolean) {
    this.newInvoiceCreatedStatus.next(status);
  }

  setDraftedInvoiceStatus(status: boolean) {
    this.draftedInvoiceStatus.next(status);
  }

  setInvoiceUpdatedStatus(status: boolean) {
    this.invoiceUpdatedStatus.next(status);
  }

  getCurrentInvoiceId() {
    return this.currentInvoiceId.value!;
  }

  setInvoices(invoices: InvoiceGetDto[]) {
    this.invoices.next(invoices);
  }

  setCurrentInvoiceId(id: string) {
    this.currentInvoiceId.next(id);
  }

  setCurrentInvoice(id: string) {
    this.currentInvoice.next(this.getInvoiceById(id));
  }

  setInvoiceEditionMode(status: boolean) {
    this.invoiceEditionMode.next(status);
  }

  setInvoiceDeletionStatus(status: boolean) {
    this.invoiceDeletionStatus.next(status);
  }

  setInvoiceStateStatus(status: boolean) {
    this.invoiceStateStatus.next(status);
  }

  setFilterDisplayStatus(status: boolean) {
    this.filterDisplayStatus.next(status);
  }

  setInvoiceDeletionConfirmationStatus(status: boolean) {
    this.invoiceDeletionConfirmationStatus.next(status);
  }



  private getInvoiceById(id: string) {
    const invoice = this.invoices.getValue()?.find((i: InvoiceGetDto) => i._id === id);
    return invoice;
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
  setExpiredTokenStatus(status: boolean) {
    this.expiredTokenStatus.next(status);
  }

  //// TOKEN METHODS ////

  //// LOADING METHODS ////
  setLoadingStatus(status: boolean) {
    this.loadingStatus.next(status);
  }
  //// LOADING METHODS ////


  //// SWITCH METHODS ////

  setSwitchStatus(status: boolean) {
    this.switchStatus.next(status);
  }
  //// SWITCH METHODS ////


}
