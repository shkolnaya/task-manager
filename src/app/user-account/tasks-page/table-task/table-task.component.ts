import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Task } from '../task/task.interface';


@Component({
  selector: 'app-table-task',
  templateUrl: './table-task.component.html',
  styleUrls: ['./table-task.component.scss']
})
export class TableTaskComponent implements OnInit, AfterViewInit {

  @Input()
  tasks: Task[];

  displayedColumns: string[] = ['name', 'project', 'date', 'result'];
  dataSource: any;
 
  constructor(private _liveAnnouncer: LiveAnnouncer) {}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.tasks);
  }

  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }


}
