import { Component, Input, OnInit } from '@angular/core';
import { InvoiceGetDto } from 'src/app/models/invoice';

@Component({
  selector: 'app-invoice-list-item',
  templateUrl: './invoice-list-item.component.html',
  styleUrls: ['./invoice-list-item.component.scss']
})
export class InvoiceListItemComponent implements OnInit {

  @Input() invoice!: InvoiceGetDto;

  constructor() { }

  ngOnInit(): void {
  }

}
