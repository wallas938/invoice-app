import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { StoreService } from 'src/app/core/services/store/store.service';
import { UserService } from 'src/app/home/services/user.service';
import { UserGetDto } from 'src/app/models/user/userGetDto';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.scss']
})
export class InvoiceListComponent implements OnInit {

  user!: UserGetDto;

  constructor(private userService: UserService,
              private router: Router,
              private route: ActivatedRoute,
              private store: StoreService) { }

  ngOnInit(): void {
    this.route.data.subscribe(
      (resolverData: Data) => {
        this.user = resolverData['user'];
        console.log(this.user);
      }
    )
  }

}
