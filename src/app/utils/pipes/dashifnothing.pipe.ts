import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'dashIfNothing' })
export class DashIfNothingPipe implements PipeTransform {
  public transform(value: any): string {
    if (value === null || value === undefined || value === '') {
      return '—';
    }

    return value.toString();
  }
}
