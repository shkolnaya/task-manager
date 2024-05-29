import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Task } from '../../tasks-page/task/task.interface';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import { Project } from '../project.interface';
import { MatDialog } from '@angular/material/dialog';
import { TaskFormComponent } from '../../tasks-page/task-form/task-form.component';
import { DialogResult } from '../../tasks-page/dialog-result';
import { Observable, forkJoin } from 'rxjs';
import * as moment from 'moment';
import { TaskService } from 'src/app/modules/user-account/services/task.service';
import { ProjectsService } from 'src/app/modules/user-account/services/projects.service';

@Component({
  selector: 'app-project-tasks',
  templateUrl: './project-tasks.component.html',
  styleUrls: ['./project-tasks.component.scss']
})
export class ProjectTasksComponent implements OnInit, AfterViewChecked {
  tasks: Task[] = [];
  project: Project;
  projects: Project[];

  private projectId: number;
  private readonly initialSelection = [] as Task[];
  private readonly  allowMultiSelect = true;

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

  loading = false;

  ngOnInit() {
    this.loading = true;

    this.route.params.subscribe(params=>{
      this.projectId = parseInt(params['id']);

      forkJoin({
        project: this.projectService.getProjectById(this.projectId),
        projectTasks: this.taskService.getProjectTasks(this.projectId),
        transferOptions: this.projectService.getProjects()
      }).subscribe(result => {
        this.project = result.project;

        this.tasks = result.projectTasks;
        this.processData();

        this.projects = result.transferOptions.filter((el) =>{
          return el.id !== this.project.id
        });

        this.loading = false;
      });
    });
  }

  processData() {
    const tasksToDo: Task[] = [];
    const tasksDone: Task[] = [];

    this.tasks.forEach(task => {
      task.deadline = moment(task.deadline);
      if (task.isDone) {
        tasksDone.push(task);
      } else {
        tasksToDo.push(task)
      }
    });

    this.tasksToDo = tasksToDo;
    this.tasksDone = tasksDone;

    this.toDoDataSource = new MatTableDataSource(this.tasksToDo);
    this.doneDataSource = new MatTableDataSource(this.tasksDone);
    this.toDoSelection = new SelectionModel<Task>(this.allowMultiSelect, this.initialSelection);
    this.doneSelection = new SelectionModel<Task>(this.allowMultiSelect, this.initialSelection);
  }

  updateProjectName(){
    this.projectService.updateProject(this.project).subscribe(
      res => {
        this.titleInputVisible = false;
      }
    );
  }

  @ViewChild(MatSort) 
  sort: MatSort;

  ngAfterViewChecked() {
    if (this.toDoDataSource) {
      this.toDoDataSource.sort = this.sort;
    }
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

  completeSelectedTasks() {
    const taskUpdateRequests: Observable<Task>[] = [];
    this.toDoSelection.selected.forEach(task  => {
      task.isDone = true;
      taskUpdateRequests.push(this.taskService.updateTask(task));
    });

    forkJoin(taskUpdateRequests).subscribe(
      result => {
        this.taskService.getProjectTasks(this.projectId).subscribe(tasks => {
          this.tasks = tasks;
          this.processData();
        })
      }
    )
  }

  undoneSelectedTasks(){
    const taskUpdateRequests: Observable<Task>[] = [];
    this.doneSelection.selected.forEach(task  => {
      task.isDone = false;
      task.completedDate = null;
      taskUpdateRequests.push(this.taskService.updateTask(task));
    });
    forkJoin(taskUpdateRequests).subscribe(
      result => {
        this.taskService.getProjectTasks(this.projectId).subscribe(tasks => {
          this.tasks = tasks;
          this.processData();
        })
      }
    )
  }

  transferToDoTasks(projectId: number){
    const taskUpdateRequests: Observable<Task>[] = [];
    this.toDoSelection.selected.forEach(task  => {
      task.projectId = projectId;
      taskUpdateRequests.push(this.taskService.updateTask(task));
    });
    forkJoin(taskUpdateRequests).subscribe(
      result => {
        this.taskService.getProjectTasks(this.projectId).subscribe(tasks => {
          this.tasks = tasks;
          this.processData();
        })
      }
    )

  }

  openTitleInput() {
    this.titleInputVisible = true;
    this.input.nativeElement.focus();
  }

  createTask(): void {
    const newTask = {

    } as Task;
    this.openEditTaskDialog(newTask, true);
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
        projects: [this.project],
        isNew: isNew,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      switch(result?.action) {
        case 'Submit':
          if (result.data&& result.isNew) {
            this.taskService.createTask(result.data).subscribe(
              result => {
                this.taskService.getProjectTasks(this.projectId).subscribe(tasks => {
                  this.tasks = tasks;
                  this.processData();
                })
              }
            );
          }  
          if (result.data && !result.isNew) {
            this.taskService.updateTask(result.data).subscribe(
              result => {
                this.taskService.getProjectTasks(this.projectId).subscribe(tasks => {
                  this.tasks = tasks;
                  this.processData();
                })
              }
            );
          }    
            
          this.processData(); 

          break;
        default:
          break;
      }
    });
  }

}
