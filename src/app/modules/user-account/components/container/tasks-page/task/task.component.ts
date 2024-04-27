import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Task } from './task.interface';
import * as moment from 'moment';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit{

  @Input()
  task: Task;

  @Output()
  editClick = new EventEmitter<void>();

  isExpired: boolean = false;

  ngOnInit(){
    this.checkExpired()
  }

  checkExpired(){
    if (moment().isAfter(this.task.deadline, 'day')){
      this.isExpired = true;
    }
  }

  emitEdit(): void {
    this.editClick.emit();
  }

}
