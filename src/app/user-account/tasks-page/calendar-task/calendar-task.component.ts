import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { TaskService } from '../task.service';
import { Task } from '../task/task.interface';

@Component({
  selector: 'app-calendar-task',
  templateUrl: './calendar-task.component.html',
  styleUrls: ['./calendar-task.component.scss']
})



export class CalendarTaskComponent implements OnInit{

  constructor(private taskService: TaskService){}

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



  dates: moment.Moment[] = [];

  fillDates(){
    let firstDay = moment().month(this.currentMonthIndex).date(1);
    let lastDay =  moment().endOf('month');
    let daysBefore = firstDay.day();
    let daysAfter = 7 - lastDay.day();

    if(lastDay.day() != 0){
      lastDay.add(daysAfter, 'd');
    }
    let day = firstDay;
    if(firstDay.day() != 1){
      day = firstDay.add(-daysBefore + 1, 'd');
    }
      while (day <= lastDay){
        this.dates.push(moment(day.toDate()));
        day.add(1, 'd')
      }

  }

  ngOnInit(): void {
    this.fillDates();

    this.tasks = this.taskService.getAllTasks();
  }
  


}
