import { formatDate } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertDate'
})
export class ConvertDatePipe implements PipeTransform {
  transform(value: string, term: string): string {
    if (!isNaN(+term)) {
      return formatDate(new Date(new Date(value).setDate(new Date(value).getDate() + +term)).toString(), 'd MMM y', 'en-US');
    }
    return value;
  }
}
