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

  tasksToDo: Task[];
  tasksDone: Task[];
  displayedColumns: string[] = ['select', 'name', 'description', 'date'];
  toDoDataSource: any;
  doneDataSource: any;

  toDoSelection: SelectionModel<Task>;
  doneSelection: SelectionModel<Task>;

  ngOnInit() {
    this.route.params.subscribe(params=>{
      let id = params['id'];
      this.projectId = id;
      this.tasks = this.taskService.getProjectTasks(id);
    });

    this.processData();

    this.toDoDataSource = new MatTableDataSource(this.tasksToDo);
    this.doneDataSource = new MatTableDataSource(this.tasksDone);

    const initialSelection = [] as Task[];
    const allowMultiSelect = true;
    this.toDoSelection = new SelectionModel<Task>(allowMultiSelect, initialSelection);
    this.doneSelection = new SelectionModel<Task>(allowMultiSelect, initialSelection);
  }

  processData(){
    this.getTasksToDo();
    this.toDoDataSource = this.tasksToDo;
    this.getTasksDone();
    this.doneDataSource = this.tasksDone;
  }

  getTasksToDo(){
    this.tasksToDo = this.tasks.filter(task =>{
      return !task.isDone;
      
    })
  }

  getTasksDone(){
    this.tasksDone = this.tasks.filter(task =>{
      return task.isDone;
    })
  }

  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.toDoDataSource.sort = this.sort;
  }

    /** Whether the number of selected elements matches the total number of rows. */
  isAllToDoSelected() {
    const numSelected = this.toDoSelection.selected.length;
    const numRows = this.toDoDataSource.data.length;
    return numSelected == numRows;
  }

  isAllDoneSelected() {
    const numSelected = this.doneSelection.selected.length;
    const numRows = this.doneDataSource.data.length;
    return numSelected == numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    this.isAllToDoSelected() ?
        this.toDoSelection.clear() :
        this.toDoDataSource.data.forEach((row: Task) => this.toDoSelection.select(row));
  }

  completeSelectedTasks(){
    this.toDoSelection.selected.forEach(task  => {
      task.isDone = true;
    });
    this.processData();
    this.toDoSelection.clear();
  }

  undoneSelectedTasks(){
    this.doneSelection.selected.forEach(task  => {
      task.isDone = false;
    });
    this.processData();
    this.doneSelection.clear();
  }
}
