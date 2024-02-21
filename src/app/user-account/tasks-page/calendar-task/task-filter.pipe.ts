import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../task/task.interface';
import * as moment from 'moment';

@Pipe({
  name: 'taskFilter'
})
export class TaskFilterPipe implements PipeTransform {

  transform(value: Task[], ...args: moment.Moment[]): Task[] {
    const currentDate = args[0];
    return value.filter(function (task){
      return currentDate.isSame(task.date, 'day');
    })
  }

}
