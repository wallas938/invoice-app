import { Injectable } from '@angular/core';
import { StoreService } from 'src/app/core/services/store/store.service';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor(private storeService: StoreService) { }

  setLoadingStatus(status: boolean) {
    this.storeService.setLoadingStatus(status);
  }
}
