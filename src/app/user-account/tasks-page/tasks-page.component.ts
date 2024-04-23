import { Component, OnInit } from '@angular/core';
import { Task } from './task/task.interface';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ThisReceiver } from '@angular/compiler';
import { TaskService } from './task.service';
import * as moment from 'moment';
import { MatDialog } from '@angular/material/dialog';
import { TaskFormComponent } from './task-form/task-form.component';
import { DialogResult } from './dialog-result';
import { ProjectsService } from '../projects-page/projects.service';
import { Project } from '../projects-page/project.interface';
import { TaskFilter } from 'src/core/interfaces/task-filter.interface';
import { NumberFormatStyle } from '@angular/common';

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


  constructor(private taskService: TaskService, public dialog: MatDialog, private projectService: ProjectsService){}

  viewTypes = ViewType;  
  viewType:  ViewType;

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

  projects: Project[];

  ngOnInit(): void {
    this.projectService.getProjects().subscribe(
      (res)=> {
        this.projects = res
      }
    );

    this.processData()

    this.viewType = ViewType.Grid;

  }

  processData(){
    this.taskService.getFilteredTasks(this.filters).subscribe(
      (res)=> {
        this.allTasks = res;
        this.filterTasks(this.allTasks);
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
      task.date = moment(task.date);
      if (today.isAfter(task.date, 'day')){
        this.expiredTasks.push(task);
      }
      if (today.isSame(task.date, 'day')){
        this.todayTasks.push(task);
      }
      if(tomorrow.isSame(task.date, 'day')){
        this.tomorrowTasks.push(task);
      }
      if (task.date.isBetween(weekStart, weekEnd, 'day', '[]')){
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

      if (event.container.id == 'expired'){
        event.container.data[event.currentIndex].date = moment();
      } 
      if(event.container.id == 'today'){
        event.container.data[event.currentIndex].date = moment().add(-1, 'day');
      }
      if(event.container.id == 'tomorrow'){
        event.container.data[event.currentIndex].date = moment().add(1, 'day');
      }
      if(event.container.id == 'week'){
        event.container.data[event.currentIndex].date = this.getNextWeekStart();
      }
      this.taskService.updateTask(event.container.data[event.currentIndex]).subscribe();
      console.log('ffff')
    }
  }

  createTask(): void {
    const newTask = {

    } as Task;

    this.openEditTaskDialog(newTask, true);

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
        isNew: isNew
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      switch(result?.action) {
        case 'Submit':
          if (result.data && result.isNew) {
            this.taskService.createTask(result.data).subscribe(
              res => {
                this.processData()
              }
            );
          } 
          if (result.data && !result.isNew){
            this.taskService.updateTask(result.data).subscribe(
              res => {
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
