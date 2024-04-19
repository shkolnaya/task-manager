import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Task } from '../task/task.interface';
import * as moment from 'moment';
import { TaskService } from '../task.service';
import { TaskFilter } from 'src/core/interfaces/task-filter.interface';


@Component({
  selector: 'app-table-task',
  templateUrl: './table-task.component.html',
  styleUrls: ['./table-task.component.scss']
})
export class TableTaskComponent implements OnInit, AfterViewInit {

  
  tasks: Task[];

  displayedColumns: string[] = ['name', 'project', 'date', 'result'];
  dataSource: any;

  filter: TaskFilter = {
    filterName: 'isDone',
    filterValue: 'false'
  }

 
  constructor(private _liveAnnouncer: LiveAnnouncer, private taskService: TaskService) {}

  ngOnInit(): void {

    this.taskService.getFilteredTasks([this.filter]).subscribe(
      (res)=> {
        this.tasks = res;
        this.dataSource = new MatTableDataSource(this.tasks);
      }
    );
    
  }

  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  checkExpired(task: Task){
    return moment().isAfter(task.date, 'day')
  }

}
