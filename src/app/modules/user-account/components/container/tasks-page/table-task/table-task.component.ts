import { AfterViewChecked, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Task } from '../task/task.interface';
import * as moment from 'moment';
import { TaskFilter } from 'src/core/interfaces/task-filter.interface';
import { MatDialog } from '@angular/material/dialog';
import { BaseTaskComponent } from '../base-task/base-task.component';
import { TaskService } from 'src/app/modules/user-account/services/task.service';


@Component({
  selector: 'app-table-task',
  templateUrl: './table-task.component.html',
  styleUrls: ['./table-task.component.scss']
})
export class TableTaskComponent extends BaseTaskComponent implements OnInit, AfterViewChecked {
  
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

 
  constructor(taskService: TaskService, dialog: MatDialog){
    super(taskService, dialog);
  }

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


}
