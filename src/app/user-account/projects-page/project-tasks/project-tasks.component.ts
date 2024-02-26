import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Task } from '../../tasks-page/task/task.interface';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../../tasks-page/task.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-project-tasks',
  templateUrl: './project-tasks.component.html',
  styleUrls: ['./project-tasks.component.scss']
})
export class ProjectTasksComponent implements OnInit, AfterViewInit{
  tasks: Task[];
  projectId: number;

  constructor(private route: ActivatedRoute, private taskService: TaskService) { }

  displayedColumns: string[] = ['name', 'description', 'date'];
  dataSource: any;

  ngOnInit() {
    this.route.params.subscribe(params=>{
      let id = params['id'];
      this.projectId = id;
      this.tasks = this.taskService.getProjectTasks(id)
    });

    this.dataSource = new MatTableDataSource(this.tasks);
  }

  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
}
