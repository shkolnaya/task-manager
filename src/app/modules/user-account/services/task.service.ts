import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { BaseService } from 'src/core/base-service.service';
import { HttpClient } from '@angular/common/http';
import { TaskFilter } from 'src/core/interfaces/task-filter.interface';
import { Task } from '../components/container/tasks-page/task/task.interface';

@Injectable()
export class TaskService extends BaseService {

  $tasks : Observable<Task[]> = new Observable<Task[]>();
  

  constructor( httpClient: HttpClient) {
    super(httpClient);
    const a = moment();
  } 


  public getAllTasks(): Observable<Task[]>{
    return this.getRecords<Task[]>('api/Tasks/search', {filters: []})
  };

  public getFilteredTasks(filters: TaskFilter[]): Observable<Task[]>{
    return this.getRecords<Task[]>('api/Tasks/search', {'filters': filters})
  };

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


  createTask(task: Task): Observable<string> {
    return this.post<string>('api/Tasks', task)
  }

  updateTask(task: Task): Observable<Task> {
    return this.put<Task>(`api/Tasks/${task.id}`, task)
  }
}
