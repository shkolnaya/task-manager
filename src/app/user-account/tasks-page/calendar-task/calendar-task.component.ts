import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { TaskService } from '../task.service';
import { Task } from '../task/task.interface';
import { TaskFilter } from 'src/core/interfaces/task-filter.interface';
import { TaskFormComponent } from '../task-form/task-form.component';
import { DialogResult } from '../dialog-result';
import { MatDialog } from '@angular/material/dialog';
import { Project } from '../../projects-page/project.interface';

@Component({
  selector: 'app-calendar-task',
  templateUrl: './calendar-task.component.html',
  styleUrls: ['./calendar-task.component.scss']
})



export class CalendarTaskComponent implements OnInit{

  @Input()
  projects: Project[]

  constructor(private taskService: TaskService, public dialog: MatDialog){}

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
      (res)=> {
        this.tasks = res;
      }
    );
  }
  
  editTask(editTask: Task): void {
    const task = {...editTask};

    this.openEditTaskDialog(task, false);
  }

  openEditTaskDialog(currentTask: Task, isNew: boolean): void {
    const dialogRef = this.dialog.open<TaskFormComponent, any, DialogResult<Task>>(TaskFormComponent, {
      width: '500px',
      data: {
        task: currentTask,
        projects: this.projects,
        isNew: isNew,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      switch(result?.action) {
        case 'Submit':
          if (result.data && !result.isNew) {
            this.taskService.updateTask(result.data).subscribe(
              result => {
                this.processData()
              }
            );
          }    

          break;
        default:
          break;
      }
    });
  }

}
