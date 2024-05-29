import { Component, Input } from '@angular/core';
import { Task } from '../task/task.interface';
import { MatDialog } from '@angular/material/dialog';
import { TaskFormComponent } from '../task-form/task-form.component';
import { DialogResult } from '../dialog-result';
import { Project } from '../../projects-page/project.interface';
import { TaskService } from 'src/app/modules/user-account/services/task.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';

@Component({
  selector: 'app-base-task',
  templateUrl: './base-task.component.html',
  styleUrls: ['./base-task.component.scss']
})
export abstract class BaseTaskComponent {

  @Input()
  projects: Project[]

  abstract processData(): void;

  constructor(protected taskService: TaskService, private dialog: MatDialog, private snackBar: MatSnackBar){}

  editTask(editTask: Task): void {
    const task = {...editTask};
    this.openEditTaskDialog(task);
  }

  doneTask(task: Task){
    task.isDone = true;
    task.completedDate = moment().toISOString();
    this.taskService.updateTask(task).subscribe(
      () => {
        this.processData();
        this.snackBar.open('Congratulations', 'OK');
      }
    )
  }

  openEditTaskDialog(currentTask: Task): void {
    const dialogRef = this.dialog.open<TaskFormComponent, any, DialogResult<Task>>(TaskFormComponent, {
      width: '500px',
      data: {
        task: currentTask,
        projects: this.projects,
        isNew: false,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      switch(result?.action) {
        case 'Submit':
          if (result.data && !result.isNew) {
            this.taskService.updateTask(result.data).subscribe(
              () => {
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
