import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/authentication.service';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthenticationService,
    private router: Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      const state = this.router.routerState.snapshot;

      // add authorization header with jwt token if available
      let currentUser = this.authService.currentUserValue;
      if (currentUser && currentUser.token) {
          request = request.clone({
              setHeaders: {
                  "Authorization": `Bearer ${currentUser.token}`
              }
          });
      }

      return next.handle(request).pipe(catchError((err: HttpErrorResponse) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.authService.logoutUser();
            this.router.navigate(['']);
          }
        }
        return throwError(err)
      }));
    }
}