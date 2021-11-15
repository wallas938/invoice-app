import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { InvoiceGetDto } from 'src/app/models/invoice';

@Component({
  selector: 'app-invoice-header',
  templateUrl: './invoice-header.component.html',
  styleUrls: ['./invoice-header.component.scss']
})
export class InvoiceHeaderComponent implements OnInit {

  @Input() isDarkTheme!: boolean;
  @Input() currentInvoice: InvoiceGetDto | undefined;
  @Output() edit: EventEmitter<string> = new EventEmitter();
  @Output() delete: EventEmitter<null> = new EventEmitter();
  @Output() markAsPaid: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onEdit(invoiceId: string) {
    this.edit.emit(invoiceId);
  }

  onShowPromptForDelete() {
    this.delete.emit();
  }

  onMarkAsPaid(invoiceId: string) {
    this.markAsPaid.emit(invoiceId);
  }
}
