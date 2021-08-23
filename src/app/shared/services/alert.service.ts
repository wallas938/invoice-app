import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private message: string = "";
  private class: string = "";

  constructor() { }

  setMessage(message: string, type: string) {
    this.message = message;
    this.class = type;
  }

  getMessage() {
    return this.message;
  }

  getClass() {
    return this.class;
  }
}
