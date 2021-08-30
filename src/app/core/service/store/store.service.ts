import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private userSignUpStatus = new BehaviorSubject(false);
  public readonly userSignUpStatus$ = this.userSignUpStatus.asObservable();

  constructor() { }

  setUserSignUpStatus(status: boolean) {
    this.userSignUpStatus.next(status);
  }
}
