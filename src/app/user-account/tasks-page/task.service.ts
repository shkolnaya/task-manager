import { Injectable } from '@angular/core';
import { Task } from './task/task.interface';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor() {
    const a = moment();
  }

  tasks: Task[] = [
      {
        name: 'Expired task',
        description: 'Start using this app earlier',
        category: 'Important',
        date: moment('2024-01-01')
      },
      {
        name: 'My first task',
        description: 'Create my firts task in this app',
        category: 'General',
        date: moment(),
      },
      {
        name: 'My second task',
        description: 'Have my first task done',
        category: 'General',
        date: moment(),
      },
      {
        name: 'Clean the house',
        category: 'Chores',
        date: moment(),
      },
      {
        name: 'Task for tomorrow',
        description: 'Check if everything was done yesterday',
        category: 'General',
        date: moment('2024-02-03'),
      },
      {
        name: 'Vacation',
        description: 'Plan trip to Italy',
        category: 'Holiday',
        date: moment('2024-02-07'),
      }
  ]

  expiredTasks: Task[] 
  todayTasks: Task[]
  tomorrowTasks: Task[]
  weekTasks: Task[]

  public getExpiredTasks(){
    let today = moment();
    return this.tasks.filter(function (task){
      return today.isAfter(task.date, 'day');
    });
  }

  public getTodayTasks(): Task[] {
    let today = moment();
    return this.tasks.filter(function (task){
      return today.isSame(task.date, 'day');
    });
  }

  public getTomorrowTasks(): Task[] {
    let tomorrow = moment().add(1, 'day');
    return this.tasks.filter(task =>{
      return tomorrow.isSame(task.date, 'day');
    });

  }

  getNextWeekStart(){
    let todayIndex = moment().isoWeekday();
    return moment().add((8-todayIndex), 'day')

  }

  public getWeekTasks(){
    let weekStart = this.getNextWeekStart()
    let weekEnd = weekStart.add(7, 'day')
    return this.tasks.filter(task => {
      return task.date.isBetween(weekStart, weekEnd, 'day');
    });
  }
}
