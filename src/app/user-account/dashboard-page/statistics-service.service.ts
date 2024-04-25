import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from 'src/core/base-service.service';
import { CompleteProject } from './projects-statistics/complete-project';
import { DoneStatistics } from './done-statistics/done-statistics';
import { ExpiredStatistics } from './expired-statistics/expired-statistics';

@Injectable()
export class StatisticsServiceService extends BaseService{

  constructor( httpClient: HttpClient ) {
    super (httpClient)
   }

  getProjectsStatistics(): Observable<CompleteProject[]>{
    return this.get<CompleteProject[]>('api/Statistics/CompleteProjectStatistics')
  }

  getDoneStatistics(): Observable<DoneStatistics>{
    return this.get<DoneStatistics>('api/Statistics/DoneTasksStatistics')
  }

  getExpiredStatistics(): Observable<ExpiredStatistics>{
    return this.get<ExpiredStatistics>('api/Statistics/ExpiredTasksStatistics')
  }
}
