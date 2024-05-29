import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from 'src/core/base-service.service';
import { User } from './user';

@Injectable()
export class SettingsService extends BaseService{

  constructor( httpClient: HttpClient ) {
    super (httpClient)
  }

  getUserInfo(): Observable<User>{
    return this.get<User>('api/Users/get')
  }

  updateUser(user: User): Observable<string>{
    return this.put<string>('api/Users/update', user)
  }
}
