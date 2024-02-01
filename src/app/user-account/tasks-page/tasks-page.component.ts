import { Component, OnInit } from '@angular/core';
import { Task } from './task/task.interface';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-tasks-page',
  templateUrl: './tasks-page.component.html',
  styleUrls: ['./tasks-page.component.scss']
})
export class TasksPageComponent implements OnInit{

  todayTasks: Task[] = [];
  tomorrowTasks: Task[] = [];

  ngOnInit(): void {
    this.todayTasks = [
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
    ];

    this.tomorrowTasks = [
      {
        name: 'Task for tomorrow',
        description: 'Check if everything was done yesterday',
        category: 'General',
      }
    ]
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
    }
  }



}
