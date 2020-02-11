import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formControlDateSort',
})
export class FormControlDateSortPipe implements PipeTransform {

  transform(value: any[], ...args: any[]): any {
    return this.sortFormControlByEndDate(value);
  }

  private sortFormControlByEndDate(dateFormControls: any[]) {
    dateFormControls.sort((a, b) => {
      const aEndDate = new Date(a.value.end);
      const bEndDate = new Date(b.value.end);
      if (aEndDate < bEndDate) {
        return -1;
      } else if (aEndDate > bEndDate) {
        return 1;
      } else {
        return 0;
      }
    });
    return dateFormControls;
  }
}
