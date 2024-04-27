
import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import * as moment from 'moment';
import { TaskService } from '../task.service';
import { Task } from '../task/task.interface';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogResult } from '../dialog-result';
import { ProjectsService } from '../../projects-page/projects.service';
import { Project } from '../../projects-page/project.interface';

interface TaskForm {
  name: FormControl<string | null>;
  description: FormControl<string | null>;
  project: FormControl<number | null>;
  date: FormControl<moment.Moment | null>;
}

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {

  @Input()
  isNew: boolean

  @Input()
  taskToEdit: Task

  constructor(
    private projectService: ProjectsService, 
    public dialogRef: MatDialogRef<TaskFormComponent, DialogResult<Task>>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      dialogRef.disableClose = true;
      dialogRef.backdropClick().subscribe(x=> {
        const a = confirm('Are you sure?');
        if (a) {
          this.dialogRef.close({
            action: 'ClickOutside'
          })
        }
      })
  }

  taskForm: FormGroup<TaskForm>;
  // name: string;
  // desc: string;
  // cat: string;
  // deadline: moment.Moment;

  projects: Project[];

  ngOnInit(): void {    
    this.taskForm = new FormGroup<TaskForm>({
      name: new FormControl<string>('', Validators.required),
      description: new FormControl(''),
      project: new FormControl(1),
      date: new FormControl(moment())
    });

    this.taskForm.patchValue(this.data.task);
    this.projects = this.data.projects;
    this.isNew = this.data.isNew;
  }

  submit() {
    if (this.taskForm.valid){
      const taskFormValue = this.taskForm.getRawValue();
      const task: Task = {
        id: this.data.task.id ?? 0,
        name: taskFormValue.name!,
        description: taskFormValue.description,
        projectId: taskFormValue.project!,
        projectName: '',
        deadline: taskFormValue.date!,
        isDone: false,
      }

      this.dialogRef.close({
        data: task,
        action: 'Submit',
        isNew: this.isNew
      });
    }
  }

  cancel() {
    this.dialogRef.close({
      action: 'Cancel'
    });
  }
}

