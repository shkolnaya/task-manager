import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Task } from '../../tasks-page/task/task.interface';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../../tasks-page/task.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import { Project } from '../project.interface';
import { ProjectsService } from '../projects.service';
import { MatDialog } from '@angular/material/dialog';
import { TaskFormComponent } from '../../tasks-page/task-form/task-form.component';
import { DialogResult } from '../../tasks-page/dialog-result';

@Component({
  selector: 'app-project-tasks',
  templateUrl: './project-tasks.component.html',
  styleUrls: ['./project-tasks.component.scss']
})
export class ProjectTasksComponent implements OnInit, AfterViewInit{
  tasks: Task[];
  project: Project;

  projects: Project[];

  constructor(
    private route: ActivatedRoute, 
    private taskService: TaskService, 
    public dialog: MatDialog,
    private projectService: ProjectsService
  ) {}

  tasksToDo: Task[];
  tasksDone: Task[];
  displayedColumns: string[] = ['select', 'name', 'description', 'date'];
  toDoDataSource: any;
  doneDataSource: any;

  toDoSelection: SelectionModel<Task>;
  doneSelection: SelectionModel<Task>;

  titleInputVisible: boolean = false;

  @ViewChild('input')
  input: ElementRef;



  ngOnInit() {
    this.route.params.subscribe(params=>{
      let id = params['id'];
      this.project = this.projectService.getProjectById(id);
      this.tasks = this.taskService.getProjectTasks(id);
    });

    this.processData();

    this.projectService.getProjects().subscribe(
      (res)=> {
        this.projects = res;
      }
    );
    this.projects = this.projects.filter((el) =>{
      return el.id !== this.project.id
    })

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
    const numRows = this.toDoDataSource.length;
    return numSelected == numRows;
  }

  isAllDoneSelected() {
    const numSelected = this.doneSelection.selected.length;
    const numRows = this.doneDataSource.length;
    return numSelected == numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllToDoRows() {
    this.isAllToDoSelected() ?
        this.toDoSelection.clear() :
        this.toDoDataSource.data.forEach((row: Task) => this.toDoSelection.select(row));
  }

  toggleAllDoneRows() {
    this.isAllDoneSelected() ?
        this.doneSelection.clear() :
        this.doneDataSource.data.forEach((row: Task) => this.doneSelection.select(row));
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

  transferToDoTasks(projectId: number){
    this.toDoSelection.selected.forEach(task  => {
      task.project = projectId;
    });
    this.tasks = this.taskService.getProjectTasks((this.project as Project).id);
    this.processData();
    this.toDoSelection.clear();
  }

  openTitleInput() {
    this.titleInputVisible = true;
    this.input.nativeElement.focus();
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
        projects: [this.project],
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      switch(result?.action) {
        case 'Submit':
          if (result.data) {
            this.taskService.createTask(result.data);
            this.tasks = this.taskService.getProjectTasks((this.project as Project).id);
            this.processData();
          }           
          break;
        default:
          break;
      }
    });
  }

}
