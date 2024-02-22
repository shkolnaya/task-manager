import { Component, OnInit } from '@angular/core';
import { Task } from './task/task.interface';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ThisReceiver } from '@angular/compiler';
import { TaskService } from './task.service';
import * as moment from 'moment';
import { MatDialog } from '@angular/material/dialog';
import { TaskFormComponent } from './task-form/task-form.component';
import { DialogResult } from './dialog-result';

enum ViewType {
  Grid,
  Calendar,
  List
}

@Component({
  selector: 'app-tasks-page',
  templateUrl: './tasks-page.component.html',
  styleUrls: ['./tasks-page.component.scss']
})
export class TasksPageComponent implements OnInit{


  constructor(private taskService: TaskService, public dialog: MatDialog){}

  viewTypes = ViewType;  
  viewType:  ViewType;

  expiredTasks: Task[] = [];
  todayTasks: Task[] = [];
  tomorrowTasks: Task[] = [];
  weekTasks: Task[] = [];

  ngOnInit(): void {
    this.processData()

    this.viewType = ViewType.Grid;

  }

  processData(){
    this.expiredTasks = this.taskService.getExpiredTasks(); 
    this.todayTasks = this.taskService.getTodayTasks();

    this.tomorrowTasks = this.taskService.getTomorrowTasks();

    this.weekTasks = this.taskService.getWeekTasks();
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

      if (event.container.id == 'cdk-drop-list-1'){
        event.container.data[event.currentIndex].date = moment();
      } 
      if(event.container.id == 'cdk-drop-list-0'){
        event.container.data[event.currentIndex].date = moment().add(-1, 'day');
      }
      if(event.container.id == 'cdk-drop-list-2'){
        event.container.data[event.currentIndex].date = moment().add(1, 'day');
      }
      if(event.container.id == 'cdk-drop-list-3'){
        event.container.data[event.currentIndex].date = this.taskService.getNextWeekStart();
      }
      
    }
  }

  createTask(): void {
    const newTask = {

    } as Task;

    this.openEditTaskDialog(newTask);

  }

  editTask(editTask: Task): void {
    const task = {...editTask};

    this.openEditTaskDialog(task);
  }
  
  

  openEditTaskDialog(currentTask: Task): void {
    const dialogRef = this.dialog.open<TaskFormComponent, Task, DialogResult<Task>>(TaskFormComponent, {
      width: '500px',
      data: currentTask
    });

    dialogRef.afterClosed().subscribe(result => {
      switch(result?.action) {
        case 'Submit':
          if (result.data) {
            this.taskService.createTask(result.data);
            this.processData();
          }           
          break;
        default:
          break;
      }
    });
  }



}
