import { Injectable } from '@angular/core';
import { Task } from './task/task.interface';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { BaseService } from 'src/core/base-service.service';
import { HttpClient } from '@angular/common/http';
import { TaskFilter } from 'src/core/interfaces/task-filter.interface';

@Injectable()
export class TaskService extends BaseService {

  $tasks : Observable<Task[]> = new Observable<Task[]>();
  

  constructor( httpClient: HttpClient) {
    super(httpClient);
    const a = moment();
  } 

  tasks = [
      {
        id: 1,
        name: 'Expired task',
        description: 'Start using this app earlier',
        projectId: 1,
        date: moment('2024-01-01'),
        isDone: false,
      },
      {
        id: 2,
        name: 'My first task',
        description: 'Create my first task in this app',
        projectId: 1,
        date: moment(),
        isDone: false,
      },
      {
        id: 3,
        name: 'My second task',
        description: 'Have my first task done',
        projectId: 3,
        date: moment(),
        isDone: false,
      },
      {
        id: 4,
        name: 'Clean the house',
        description: null,
        projectId: 2,
        date: moment(),
        isDone: false,
      },
      {
        id: 5,
        name: 'Task for tomorrow',
        description: 'Check if everything was done yesterday',
        projectId: 3,
        date: moment('2024-02-03'),
        isDone: false,
      },
      {
        id: 6,
        name: 'Vacation',
        description: 'Plan trip to Italy',
        projectId: 2,
        date: moment('2024-02-5'),
        isDone: false,
      }
  ]

  expiredTasks: Task[] 
  todayTasks: Task[]
  tomorrowTasks: Task[]
  weekTasks: Task[]

  public getAllTasks(): Observable<Task[]>{
    return this.getRecords<Task[]>('api/Tasks/search', {filters: []})
  };

  public getFilteredTasks(filters: TaskFilter[]): Observable<Task[]>{
    return this.getRecords<Task[]>('api/Tasks/search', {'filters': filters})
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

  public getProjectTasks(projectId: number): Observable<Task[]>{
    return this.getFilteredTasks(
      [
        {
          filterName: 'project',
          filterValue: projectId
        }
      ]
    )
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

  createTask(task: Task): Observable<string> {
    return this.post<string>('api/Tasks', task)
  }

  updateTask(task: Task): Observable<Task> {
    return this.put<Task>(`api/Tasks/${task.id}`, task)
  }
}
