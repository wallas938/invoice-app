import { Injectable } from '@angular/core';
import { StoreService } from 'src/app/core/services/store/store.service';

@Injectable({
  providedIn: 'root'
})
export class SwitchService {

  constructor(private storeService: StoreService) { }

  setSwitchStatus(status: boolean) {
    this.storeService.setSwitchStatus(status);
  }
}
