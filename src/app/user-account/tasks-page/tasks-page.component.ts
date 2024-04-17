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
    this.expiredTasks = this.taskService.getExpiredTasks(); 
    this.todayTasks = this.taskService.getTodayTasks();

    this.tomorrowTasks = this.taskService.getTomorrowTasks();

    this.weekTasks = this.taskService.getWeekTasks();
    this.allTasks = this.taskService.getAllTasks();
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
    const dialogRef = this.dialog.open<TaskFormComponent, any, DialogResult<Task>>(TaskFormComponent, {
      width: '500px',
      data: {
        task: currentTask,
        projects: this.projects,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      switch(result?.action) {
        case 'Submit':
          if (result.data && result.data.project) {
            this.taskService.createTask(result.data);
            this.processData();
          } else {
            
          }     
          break;
        default:
          break;
      }
    });
  }



}
