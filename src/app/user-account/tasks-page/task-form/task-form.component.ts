
import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import * as moment from 'moment';
import { TaskService } from '../task.service';
import { Task } from '../task/task.interface';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

interface TaskForm {
  name: FormControl<string | null>;
  description: FormControl<string | null>;
  category: FormControl<string | null>;
  date: FormControl<moment.Moment | null>;
}

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {

  @Input()
  taskToEdit: Task

  constructor(
    public dialogRef: MatDialogRef<TaskFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Task) {
  }

  taskForm: FormGroup<TaskForm>;
  // name: string;
  // desc: string;
  // cat: string;
  // deadline: moment.Moment;


  ngOnInit(): void {    
    this.taskForm = new FormGroup<TaskForm>({
      name: new FormControl<string>('', Validators.required),
      description: new FormControl(''),
      category: new FormControl('one'),
      date: new FormControl(moment())
    });

    this.taskForm.patchValue(this.data);
  }

  onTaskSubmit(){
    if (this.taskForm.valid){
      const taskFormValue = this.taskForm.getRawValue();
      const task: Task = {
        name: taskFormValue.name!,
        description: taskFormValue.description,
        category: taskFormValue.category!,
        date: taskFormValue.date!
      }

      this.dialogRef.close(task);
    }
  }
}
