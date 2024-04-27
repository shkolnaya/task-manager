import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as moment from 'moment';
import { Task } from '../../task/task.interface';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { TaskFormComponent } from '../../task-form/task-form.component';
import { DialogResult } from '../../dialog-result';
import { MatDialog } from '@angular/material/dialog';
import { TaskService } from '../../task.service';

@Component({
  selector: 'app-calendar-cell',
  templateUrl: './calendar-cell.component.html',
  styleUrls: ['./calendar-cell.component.scss']
})
export class CalendarCellComponent implements OnInit{

  @Input()
  date: moment.Moment

  @Input()
  tasks: Task[]

  @Output()
  taskToEdit = new EventEmitter<Task>();


  constructor(public dialog: MatDialog, private taskService: TaskService){}
  isCurrentMonth: boolean;

  isToday: boolean;

  ngOnInit(): void {
    this.isCurrentMonth = this.date.month() == moment().month();
    this.isToday = this.date.isSame(moment(), 'day');
  }

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      
    
      event.container.data[event.currentIndex].deadline = this.date;
      this.taskService.updateTask(event.container.data[event.currentIndex])
        .subscribe()

      
    }
  }

  editTask(task: Task): void {
    this.taskToEdit.emit(task);
  }
  
  

  // openEditTaskDialog(currentTask: Task, isNew: boolean): void {
  //   const dialogRef = this.dialog.open<TaskFormComponent, any, DialogResult<Task>>(TaskFormComponent, {
  //     width: '500px',
  //     data: {
  //       task: currentTask,
  //       projects: [],
  //       isNew: isNew
  //     }
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     switch(result?.action) {
  //       case 'Submit':
  //         if (result.data && !result.isNew) {
  //           this.taskService.updateTask(result.data).subscribe(res => {

  //           });
  //         }           
  //         break;
  //       default:
  //         break;
  //     }
  //   });
  // } 

}
