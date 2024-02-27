import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Task } from '../../tasks-page/task/task.interface';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../../tasks-page/task.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-project-tasks',
  templateUrl: './project-tasks.component.html',
  styleUrls: ['./project-tasks.component.scss']
})
export class ProjectTasksComponent implements OnInit, AfterViewInit{
  tasks: Task[];
  projectId: number;

  constructor(private route: ActivatedRoute, private taskService: TaskService) { }


  displayedColumns: string[] = ['select', 'name', 'description', 'date'];
  dataSource: any;

  selection: SelectionModel<Task>;

  ngOnInit() {
    this.route.params.subscribe(params=>{
      let id = params['id'];
      this.projectId = id;
      this.tasks = this.taskService.getProjectTasks(id)
    });

    this.dataSource = new MatTableDataSource(this.tasks);

    const initialSelection = [] as Task[];
    const allowMultiSelect = true;
    this.selection = new SelectionModel<Task>(allowMultiSelect, initialSelection);
  }

  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

    /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected == numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach((row: Task) => this.selection.select(row));
  }
}
