import { Component, OnInit, ViewChild } from '@angular/core';
import { Task } from './task/task.interface';
import { MatDialog } from '@angular/material/dialog';
import { TaskFormComponent } from './task-form/task-form.component';
import { DialogResult } from './dialog-result';
import { Project } from '../projects-page/project.interface';
import { ColumnTasksComponent } from './column-tasks/column-tasks.component';
import { CalendarTaskComponent } from './calendar-task/calendar-task.component';
import { TableTaskComponent } from './table-task/table-task.component';
import { TaskService } from '../../../services/task.service';
import { ProjectsService } from '../../../services/projects.service';

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
  @ViewChild('columnTasks')
  private columnTasksComponent: ColumnTasksComponent;

  @ViewChild('calendarTasks')
  private calendarTasksComponent: CalendarTaskComponent;

  @ViewChild('tableTasks')
  private tableTasksComponent: TableTaskComponent;

  constructor(private taskService: TaskService, public dialog: MatDialog, private projectService: ProjectsService){}

  viewTypes = ViewType;  
  viewType:  ViewType;



  projects: Project[];

  ngOnInit(): void {
    this.projectService.getProjects().subscribe(
      (res)=> {
        this.projects = res
      }
    );

    this.viewType = ViewType.Grid;

  }  

  createTask(): void {
    const dialogRef = this.dialog.open<TaskFormComponent, any, DialogResult<Task>>(TaskFormComponent, {
      width: '500px',
      data: {
        task: { } as Task,
        projects: this.projects,
        isNew: true
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

  processData() {
    switch(this.viewType) {
      case ViewType.Grid:
        this.columnTasksComponent.processData();
        break;
      case ViewType.Calendar:
        this.calendarTasksComponent.processData();
        break;
      case ViewType.List:
        this.tableTasksComponent.processData();
        break;
      default:
        throw new Error("Incorrect parameter");
    }
  }
}
