import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading-stripe',
  templateUrl: './loading-stripe.component.html',
  styleUrls: ['./loading-stripe.component.scss']
})
export class LoadingStripeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log("LoadingStripeComponent");
  }

}
