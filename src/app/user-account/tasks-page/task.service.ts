import { Injectable } from '@angular/core';
import { Task } from './task/task.interface';
import * as moment from 'moment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  $tasks : Observable<Task[]> = new Observable<Task[]>();
  

  constructor() {
    const a = moment();
  } 

  tasks = [
      {
        name: 'Expired task',
        description: 'Start using this app earlier',
        project: 1,
        date: moment('2024-01-01'),
        isDone: false,
      },
      {
        name: 'My first task',
        description: 'Create my first task in this app',
        project: 1,
        date: moment(),
        isDone: false,
      },
      {
        name: 'My second task',
        description: 'Have my first task done',
        project: 3,
        date: moment(),
        isDone: false,
      },
      {
        name: 'Clean the house',
        description: null,
        project: 2,
        date: moment(),
        isDone: false,
      },
      {
        name: 'Task for tomorrow',
        description: 'Check if everything was done yesterday',
        project: 3,
        date: moment('2024-02-03'),
        isDone: false,
      },
      {
        name: 'Vacation',
        description: 'Plan trip to Italy',
        project: 2,
        date: moment('2024-02-5'),
        isDone: false,
      }
  ]

  expiredTasks: Task[] 
  todayTasks: Task[]
  tomorrowTasks: Task[]
  weekTasks: Task[]

  public getAllTasks(){
    return this.tasks
  };

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

  public getProjectTasks(projectId: number): Task[]{
    return this.tasks.filter(task=>{
      return task.project = projectId
    })
  }

  getNextWeekStart(){
    let todayIndex = moment().isoWeekday();
    return moment().add((8-todayIndex), 'day');

  }

  public getWeekTasks(){
    let weekStart = this.getNextWeekStart()
    let weekEnd = moment(weekStart).add(7, 'day')
    return this.tasks.filter(task => {
      return task.date.isBetween(weekStart, weekEnd, 'day', '[]');
    });
  }

  createTask(task: Task){
    this.tasks.push(task)
  }
}
