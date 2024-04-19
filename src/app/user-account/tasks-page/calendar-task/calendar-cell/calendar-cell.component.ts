import { Component, Input, OnInit } from '@angular/core';
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
      
    
      event.container.data[event.currentIndex].date = this.date;
      this.taskService.updateTask(event.container.data[event.currentIndex])
        .subscribe()

      
    }
  }

  editTask(editTask: Task): void {
    const task = {...editTask};

    this.openEditTaskDialog(task);
  }
  
  

  openEditTaskDialog(currentTask: Task): void {
    const dialogRef = this.dialog.open<TaskFormComponent, Task, DialogResult<Task>>(TaskFormComponent, {
      width: '500px',
      data: currentTask
    });

    dialogRef.afterClosed().subscribe(result => {
      switch(result?.action) {
        case 'Submit':
          if (result.data) {
            this.taskService.updateTask(result.data);
          }           
          break;
        default:
          break;
      }
    });
  } 

}
