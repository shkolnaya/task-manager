import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { BaseService } from 'src/core/base-service.service';
import { LoginRequest } from 'src/core/interfaces/login-request.interface';
import { LoginResult } from 'src/core/interfaces/login-result.interface';
import { RegistrationRequest } from 'src/core/interfaces/registration-request.interface';
import { User } from 'src/core/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService extends BaseService{

  private readonly localStorageKey = 'taskUserInfo';
  
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public $currentUser: Observable<User | null>;

  constructor(httpClient: HttpClient){
    super(httpClient);
    this.$currentUser = this.currentUserSubject.asObservable();
    
    const userDataJson = localStorage.getItem('taskUserInfo');

    if (userDataJson != null) {
      this.currentUserSubject.next(JSON.parse(userDataJson))
    } else {
      this.currentUserSubject.next(null);
    }
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  loginUser (loginRequest: LoginRequest): Observable<LoginResult> {
    return this.post<LoginResult>('api/Auth/signin', loginRequest)
      .pipe(
        tap((res) => {
          const user: User = {
            id: res.id,
            login: res.login,
            token: res.token,
            fullName: res.fullName
          };

          localStorage.setItem(this.localStorageKey, JSON.stringify(user));
          this.currentUserSubject.next(user);
      }))
  }

  logoutUser() {
    localStorage.removeItem(this.localStorageKey);
    this.currentUserSubject.next(null);
  }

  registerUser(registrationRequest: RegistrationRequest): Observable<any> {
    return this.post( 'api/Auth/signup', registrationRequest);
  }
}
