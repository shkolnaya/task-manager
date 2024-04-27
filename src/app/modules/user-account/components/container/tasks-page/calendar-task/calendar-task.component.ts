import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Task } from '../task/task.interface';
import { TaskFilter } from 'src/core/interfaces/task-filter.interface';
import { MatDialog } from '@angular/material/dialog';
import { BaseTaskComponent } from '../base-task/base-task.component';
import { TaskService } from 'src/app/modules/user-account/services/task.service';

@Component({
  selector: 'app-calendar-task',
  templateUrl: './calendar-task.component.html',
  styleUrls: ['./calendar-task.component.scss']
})



export class CalendarTaskComponent extends BaseTaskComponent implements OnInit {

  constructor(taskService: TaskService, dialog: MatDialog){
    super(taskService, dialog);
  }

  daysOfWeek: String[] = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
  ]

  currentMonthIndex: number = moment().month();

  firstDayIndex: number = moment().month(this.currentMonthIndex).date(1).day();

  tasks: Task[];
  filters: TaskFilter[];

  startDate: moment.Moment;
  endDate: moment.Moment;

  dates: moment.Moment[] = [];

  fillDates(){
    let firstDay = moment().month(this.currentMonthIndex).date(1);
    let lastDay =  moment().endOf('month');
    let daysBefore = firstDay.day();
    let daysAfter = 7 - lastDay.day();

    if(lastDay.day() != 0){
      lastDay.add(daysAfter, 'd');
    }
    this.endDate = lastDay;
    let day = firstDay;
    if(firstDay.day() != 1){
      day = firstDay.add(-daysBefore + 1, 'd');
    }
    this.startDate = moment(day);
      while (day <= lastDay){
        this.dates.push(moment(day.toDate()));
        day.add(1, 'd')
      }

  }

  ngOnInit(): void {
    this.fillDates();

    this.filters = [
      {
        filterName: 'isDone',
        filterValue: false
      },
      {
        filterName: 'date',
        filterValue: {
          min: this.startDate.toISOString(),
          max: this.endDate.toISOString(),
        }
      }
    ]

    this.processData()
  }

  processData(){
    this.taskService.getFilteredTasks(this.filters).subscribe(
      (res: Task[])=> {
        this.tasks = res;
      }
    );
  }
  


}
