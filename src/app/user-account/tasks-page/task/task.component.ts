import { Component, Input, OnInit } from '@angular/core';
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

  isExpired: boolean = false;

  ngOnInit(){
    this.checkExpired()
  }

  checkExpired(){
    if (moment().isAfter(this.task.date, 'day')){
      this.isExpired = true;
    }
  }

}
