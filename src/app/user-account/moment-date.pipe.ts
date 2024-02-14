import { Inject, Pipe, PipeTransform } from '@angular/core';
import { MAT_DATE_FORMATS, MatDateFormats } from '@angular/material/core';
import { Moment } from 'moment';

@Pipe({
  name: 'momentDate'
})
export class MomentDatePipe implements PipeTransform {
  constructor(@Inject(MAT_DATE_FORMATS) private dateFormats: MatDateFormats) {    
  }
  
  transform(value: Moment, ...args: string[]): unknown {
    return value.format(this.dateFormats.display.dateInput);
  }

}
