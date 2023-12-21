import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'separate',
  standalone: true,
})
export class NumberSeparatePipe implements PipeTransform {
  transform(value: any, percent: boolean = false): any {
    if (percent) {
      value = Math.floor(value);
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + '%';
    }
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }
}
