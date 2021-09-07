import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { StoreService } from 'src/app/core/services/store/store.service';
import { UserService } from 'src/app/home/services/user.service';
import { ProfileImage } from 'src/app/models/picture/pictureDto';
import { UserGetDto } from 'src/app/models/user/userGetDto';
import { PictureService } from 'src/app/shared/services/pictures/picture.service';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.scss']
})
export class InvoiceListComponent implements OnInit {

  user!: UserGetDto;
  imageSrc: string = 'assets/camera.svg';

  constructor(private userService: UserService,
              private router: Router,
              private route: ActivatedRoute,
              private pictureService: PictureService,
              private store: StoreService) { }

  ngOnInit(): void {
    this.route.data.subscribe(
      (resolverData: Data) => {
        this.user = resolverData['user'].user;
        this.store.setLoggedUser(this.user!);
        if (this.user.profileImage) {
          this.imageSrc = this.getProfileImage();
          /* this.imageSrc = this.generateImageSrc(this.user.profileImage); */
        }
      }
    );

    this.store.loggedUser$
      .subscribe((user: UserGetDto | null) => {
        this.user = user!;
      })
  }

  getProfileImage(): string {
    if (this.user.profileImage) {
      this.imageSrc = `http://localhost:3200/images/${this.user.profileImage.filename}`;
   }
    return this.imageSrc;
  }

}