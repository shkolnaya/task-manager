import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewChecked, AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Task } from '../task/task.interface';
import * as moment from 'moment';
import { TaskService } from '../task.service';
import { TaskFilter } from 'src/core/interfaces/task-filter.interface';
import { Project } from '../../projects-page/project.interface';
import { MatDialog } from '@angular/material/dialog';
import { TaskFormComponent } from '../task-form/task-form.component';
import { DialogResult } from '../dialog-result';


@Component({
  selector: 'app-table-task',
  templateUrl: './table-task.component.html',
  styleUrls: ['./table-task.component.scss']
})
export class TableTaskComponent implements OnInit, AfterViewChecked {
  @Input()
  projects: Project[];
  
  tasks: Task[];

  loading: boolean = false;

  displayedColumns: string[] = ['name', 'projectName', 'deadline', 'result'];
  dataSource: any;

  filters: TaskFilter[] = [
    {
      filterName: 'isDone',
      filterValue: false
    }
  ];

 
  constructor(
    private _liveAnnouncer: LiveAnnouncer, 
    private taskService: TaskService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loading = true;

    this.processData();

    this.loading = false;
    
  }

  processData(){
    this.taskService.getFilteredTasks(this.filters).subscribe(
      (res)=> {
        this.tasks = res;
        this.tasks.forEach(task => {
          task.deadline = moment(task.deadline)
        });
        this.dataSource = new MatTableDataSource(this.tasks);
      }
    );
  }

  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewChecked() {
    if (this.dataSource){
      this.dataSource.sort = this.sort;
    }
    
  }

  checkExpired(task: Task){
    return moment().isAfter(task.deadline, 'day')
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
