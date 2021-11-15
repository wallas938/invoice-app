import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  @Input() showFilter!: boolean;
  @Input() isDarkTheme!: boolean;
  @Output() filter = new EventEmitter<any>();

  draft: boolean = false;
  pending: boolean = false;
  paid: boolean = false;

  constructor() { }

  ngOnInit(): void {
    console.log(this.isDarkTheme);
  }

  onFilter(filter: string) {
    this.toggleFilter(filter);
    this.filter.emit({ draft: this.draft, pending: this.pending, paid: this.paid });
  }

  toggleFilter(filter: string) {
    switch (filter) {
      case 'draft':
        this.draft = !this.draft;
        break;
      case 'pending':
        this.pending = !this.pending;
        break;
      case 'paid':
        this.paid = !this.paid;
        break;
    }
  }
}
