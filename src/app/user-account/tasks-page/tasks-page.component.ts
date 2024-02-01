import { Component, OnInit } from '@angular/core';
import { Task } from './task/task.interface';

@Component({
  selector: 'app-tasks-page',
  templateUrl: './tasks-page.component.html',
  styleUrls: ['./tasks-page.component.scss']
})
export class TasksPageComponent implements OnInit{

  tasks: Task[] = [];

  ngOnInit(): void {
    this.tasks = [
      {
        name: 'My first task',
        description: 'Create my firts task in this app',
        category: 'General',
      },
      {
        name: 'My second task',
        description: 'Have my first task done',
        category: 'General',
      },
      {
        name: 'Clean the house',
        category: 'Chores',
      },
    ]
  }

}
