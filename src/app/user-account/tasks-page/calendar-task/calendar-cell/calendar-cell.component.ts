import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Task } from '../../task/task.interface';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-calendar-cell',
  templateUrl: './calendar-cell.component.html',
  styleUrls: ['./calendar-cell.component.scss']
})
export class CalendarCellComponent implements OnInit{

  @Input()
  date: moment.Moment

  @Input()
  tasks: Task[]

  isCurrentMonth: boolean;

  isToday: boolean;

  ngOnInit(): void {
    this.isCurrentMonth = this.date.month() == moment().month();
    this.isToday = this.date.isSame(moment(), 'day');
  }

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );

      event.container.data[event.currentIndex].date = this.date;

      
    }
  }

}
