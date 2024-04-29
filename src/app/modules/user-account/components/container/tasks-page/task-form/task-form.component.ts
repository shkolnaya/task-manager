
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { Task } from '../task/task.interface';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogResult } from '../dialog-result';
import { Project } from '../../projects-page/project.interface';

interface TaskForm {
  name: FormControl<string | null>;
  description: FormControl<string | null>;
  projectId: FormControl<number | null>;
  deadline: FormControl<moment.Moment | null>;
}

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {

  isNew: boolean;
  taskToEdit: Task;

  isDone: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<TaskFormComponent, DialogResult<Task>>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      dialogRef.disableClose = true;
      dialogRef.backdropClick().subscribe(x=> {
        const isComfirmed = confirm('Are you sure?');
        if (isComfirmed) {
          this.dialogRef.close({
            action: 'ClickOutside'
          })
        }
      })
  }

  taskForm: FormGroup<TaskForm>;

  projects: Project[];

  ngOnInit(): void {    
    this.taskForm = new FormGroup<TaskForm>({
      name: new FormControl<string>('', Validators.required),
      description: new FormControl(''),
      projectId: new FormControl(),
      deadline: new FormControl(moment())
    });

    this.projects = this.data.projects;
    this.taskForm.patchValue(this.data.task);
    
    this.isNew = this.data.isNew;
  }

  submit() {
    if (this.taskForm.valid){
      const taskFormValue = this.taskForm.getRawValue();
      const task: Task = {
        id: this.data.task.id ?? 0,
        name: taskFormValue.name!,
        description: taskFormValue.description,
        projectId: taskFormValue.projectId!,
        projectName: '',
        deadline: taskFormValue.deadline!,
        isDone: this.isDone,
      }

      this.dialogRef.close({
        data: task,
        action: 'Submit',
        isNew: this.isNew
      });
    }
  }

  doneTask(){
    this.isDone = true;
    this.submit();
  }

  cancel() {
    this.dialogRef.close({
      action: 'Cancel'
    });
  }
}

