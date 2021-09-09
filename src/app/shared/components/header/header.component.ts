import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/core/services/store/store.service';
import { UserGetDto } from 'src/app/models/user/userGetDto';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  profileImage: string = "assets/camera.svg"
  user!: UserGetDto;
  isConnected: boolean = false;
  constructor(private store: StoreService) { }

  ngOnInit(): void {
    this.store.loggedUser$
      .subscribe((user: UserGetDto | null) => {
        this.user = user!;
        if (this.user?.profileImage) {
          this.profileImage = `http://localhost:3200/images/${this.user.profileImage.filename}`;
        }
      });

      this.store.isConnected$
          .subscribe((isConnected: boolean) => {
            if (isConnected) {
              this.isConnected = isConnected;
            }
          })
  }
}
