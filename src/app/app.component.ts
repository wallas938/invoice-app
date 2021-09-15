import { Component } from '@angular/core';
import { StoreService } from './core/services/store/store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isConnected: boolean = false;

  constructor(private store: StoreService) {

  }
  ngOnInit() {
    this.store.isConnected$
        .subscribe((isConnected) => {
          if (isConnected) {
            this.isConnected = isConnected;
          }
        })
  }

}
