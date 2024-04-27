import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from 'src/core/base-service.service';
import { CompleteProject } from './projects-statistics/complete-project';
import { DoneStatistics } from './done-statistics/done-statistics';
import { AllTasksStatistics } from './expired-statistics/expired-statistics';
import { CalendarStatisticRequest } from './calendar-statistics/calendar-statistic-request';
import { CalendarStatisticResult } from './calendar-statistics/calendar-statistic-result';

@Injectable()
export class StatisticsService extends BaseService{

  constructor( httpClient: HttpClient ) {
    super (httpClient)
   }

  getProjectsStatistics(): Observable<CompleteProject[]>{
    return this.get<CompleteProject[]>('api/Statistics/CompleteProjectStatistics')
  }

  getDoneStatistics(): Observable<DoneStatistics>{
    return this.get<DoneStatistics>('api/Statistics/DoneTasksStatistics')
  }

  getExpiredStatistics(): Observable<AllTasksStatistics>{
    return this.get<AllTasksStatistics>('api/Statistics/AllTasksStatistics')
  }

  getCalendarStatistics(request: CalendarStatisticRequest): Observable<CalendarStatisticResult>{
    return this.post('api/Statistics/CalendarStatistics', request)
  } 
}
