import { Component, OnInit } from '@angular/core';
import { BaseTaskComponent } from '../base-task/base-task.component';
import { MatDialog } from '@angular/material/dialog';
import { Task } from '../task/task.interface';
import { TaskFilter } from 'src/core/interfaces/task-filter.interface';
import * as moment from 'moment';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { TaskService } from 'src/app/modules/user-account/services/task.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-column-tasks',
  templateUrl: './column-tasks.component.html',
  styleUrls: ['./column-tasks.component.scss']
})
export class ColumnTasksComponent extends BaseTaskComponent implements OnInit{

  loading: boolean = false;

  expiredTasks: Task[] = [];
  todayTasks: Task[] = [];
  tomorrowTasks: Task[] = [];
  weekTasks: Task[] = [];

  filters: TaskFilter[] = [
    {
      filterName: 'isDone',
      filterValue: false
    }
  ];

  allTasks: Task[] = [];
  
  constructor(taskService: TaskService, dialog: MatDialog, snackBar: MatSnackBar){
    super(taskService, dialog, snackBar);
  }

  ngOnInit(){
    this.processData();
  }

  processData(){
    this.loading = true;
    this.taskService.getFilteredTasks(this.filters).subscribe(
      (res: Task[])=> {
        this.allTasks = res;
        this.filterTasks(this.allTasks);
        this.loading = false;
      }
    );
  }

  filterTasks(tasks: Task[]){
    this.expiredTasks = [];
    this.todayTasks = [];
    this.tomorrowTasks = [];
    this.weekTasks = [];

    let today = moment();
    let tomorrow = moment().add(1, 'day');
    let weekStart = this.getNextWeekStart()
    let weekEnd = moment(weekStart).add(7, 'day')
    for (let task of tasks) {
      task.deadline = moment(task.deadline);
      if (today.isAfter(task.deadline, 'day')){
        this.expiredTasks.push(task);
      }
      if (today.isSame(task.deadline, 'day')){
        this.todayTasks.push(task);
      }
      if(tomorrow.isSame(task.deadline, 'day')){
        this.tomorrowTasks.push(task);
      }
      if (task.deadline.isBetween(weekStart, weekEnd, 'day', '[]')){
        this.weekTasks.push(task);
      }
    }
  }

  getNextWeekStart(){
    let todayIndex = moment().isoWeekday();
    return moment().add((8-todayIndex), 'day');
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

      if (event.container.id == 'today'){
        event.container.data[event.currentIndex].deadline = moment();
      } 
      if(event.container.id == 'expired'){
        event.container.data[event.currentIndex].deadline = moment().add(-1, 'day');
      }
      if(event.container.id == 'tomorrow'){
        event.container.data[event.currentIndex].deadline = moment().add(1, 'day');
      }
      if(event.container.id == 'week'){
        event.container.data[event.currentIndex].deadline = this.getNextWeekStart();
      }
      this.taskService.updateTask(event.container.data[event.currentIndex]).subscribe();
    }
  }
}
