import { Component, Input, OnInit } from '@angular/core';
import { Task } from './task.interface';

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
    let today = new Date();
    today.setHours(0);
    if (this.task.date < today){
      this.isExpired = true;
    }
  }

}
