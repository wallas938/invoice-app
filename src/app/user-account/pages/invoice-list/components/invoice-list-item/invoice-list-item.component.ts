import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InvoiceGetDto } from 'src/app/models/invoice';
import { InvoiceService } from '../../../../services/invoice.service';

@Component({
  selector: 'app-invoice-list-item',
  templateUrl: './invoice-list-item.component.html',
  styleUrls: ['./invoice-list-item.component.scss']
})
export class InvoiceListItemComponent implements OnInit {

  @Input() invoice!: InvoiceGetDto;
  @Input() isDarkTheme!: boolean;
  @Output() detail = new EventEmitter<string>();

  constructor(private invoiceService: InvoiceService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  navigateToDetail(id: string) {
    this.detail.emit(id);
  }

}
