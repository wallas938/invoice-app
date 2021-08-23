import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-snack-bar',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.scss']
})
export class SnackBarComponent implements OnInit {

  public message: string = "";
  public className: string = "";

  constructor(private alertMessage: AlertService) { }

  ngOnInit(): void {
    this.message = this.alertMessage.getMessage();
    this.className = this.alertMessage.getClass();
  }

}
