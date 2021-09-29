import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shorten',
  pure: false
})
export class ShortenPipe implements PipeTransform {
  transform(value: string, limit: number): string {
    if(value && value.length > limit)
      return value.substring(0, limit) + " ...";
    return value;
  }

}
