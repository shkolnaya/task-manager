import { Component, OnInit } from '@angular/core';
import { Task } from './task/task.interface';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-tasks-page',
  templateUrl: './tasks-page.component.html',
  styleUrls: ['./tasks-page.component.scss']
})
export class TasksPageComponent implements OnInit{

  expiredTasks: Task[] = [];
  todayTasks: Task[] = [];
  tomorrowTasks: Task[] = [];
  weekTasks: Task[] = [];

  ngOnInit(): void {
    this.expiredTasks = [
      {
        name: 'Expired task',
        description: 'Start using this app earlier',
        category: 'Important',
        date: new Date(2024, 1,1),
      }
    ]
    this.todayTasks = [
      {
        name: 'My first task',
        description: 'Create my firts task in this app',
        category: 'General',
        date: new Date(),
      },
      {
        name: 'My second task',
        description: 'Have my first task done',
        category: 'General',
        date: new Date(),
      },
      {
        name: 'Clean the house',
        category: 'Chores',
        date: new Date(),
      },
    ];

    this.tomorrowTasks = [
      {
        name: 'Task for tomorrow',
        description: 'Check if everything was done yesterday',
        category: 'General',
        date: new Date(2024, 1, 3),
      }
    ];

    this.weekTasks = [
      {
        name: 'Vacation',
        description: 'Plan trip to Italy',
        category: 'Holiday',
        date: new Date(2024, 1, 5),
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
