import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/core/services/store/store.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  profileImage: string = "assets/camera.svg"

  constructor(private store: StoreService) { }

  ngOnInit(): void {

  }

}
