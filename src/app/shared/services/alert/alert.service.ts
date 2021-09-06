import { Injectable } from '@angular/core';
import { StoreService } from 'src/app/core/services/store/store.service';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private message: string = "";
  private class: string = "";

  constructor(private store: StoreService) { }

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
