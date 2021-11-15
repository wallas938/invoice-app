import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { InvoiceGetDto } from 'src/app/models/invoice';

@Component({
  selector: 'app-invoice-body',
  templateUrl: './invoice-body.component.html',
  styleUrls: ['./invoice-body.component.scss']
})
export class InvoiceBodyComponent implements OnInit {
  @Input() currentInvoice: InvoiceGetDto | undefined;
  @Input() isDarkTheme!: boolean;
  @Output() edit: EventEmitter<string> = new EventEmitter()
  constructor() { }

  ngOnInit(): void {
  }

}
