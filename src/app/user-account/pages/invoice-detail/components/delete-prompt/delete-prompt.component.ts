import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-delete-prompt',
  templateUrl: './delete-prompt.component.html',
  styleUrls: ['./delete-prompt.component.scss']
})
export class DeletePromptComponent implements OnInit {

  @Input() invoiceCode!: string;
  @Output() confirmInvoiceDeletion = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit(): void {
    console.log(this.invoiceCode);
  }

  onCancel() {
    this.confirmInvoiceDeletion.emit(false);
  }

  onDelete() {
    this.confirmInvoiceDeletion.emit(true);
  }

}
