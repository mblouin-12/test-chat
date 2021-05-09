import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortByFieldPipe'
})
export class SortByFieldPipe implements PipeTransform {

  transform(array: any, field?: string, reverse?: boolean): any[] {
    if (!Array.isArray(array)) {
      return;
    }
    const rev = reverse ? -1 : 1;
    array.sort((a: any, b: any) => {
      if (this.getValue(a, field) === null || this.getValue(a, field) === undefined) {
        return 1 * rev;
      }
      if (this.getValue(b, field) === null || this.getValue(b, field) === undefined) {
        return -1 * rev;
      }
      if (this.getValue(a, field) < this.getValue(b, field)) {
        return -1 * rev;
      } else if (this.getValue(a, field) > this.getValue(b, field)) {
        return 1 * rev;
      } else {
        return 0;
      }
    });
    return array;
  }

  getValue(val, field: string) {
    let value = val;
    if (field) {
        value = value[field];
    }
    if (typeof value === 'string' || value instanceof String) {
      return value.toLowerCase();
    }
    return value;
  }
}
