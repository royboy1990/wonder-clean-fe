import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'capitalize'})
export class CapitalizePipe implements PipeTransform {
  transform(value: any): string {
    if (!value) return '';
    if (typeof value === 'string') {
      return value.charAt(0).toUpperCase() + value.slice(1);
    } else if (Array.isArray(value)) {
      return value.map(val => val.charAt(0).toUpperCase() + val.slice(1)).join(', ');
    }
    return value;
  }
}
