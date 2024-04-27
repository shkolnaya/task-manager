import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { LoginRequest } from 'src/core/interfaces/login-request.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hide = true;
  loginForm: FormGroup;

  constructor( private authService: AuthenticationService, private router: Router ) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      login: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })
  }

  onLoginSubmit() {
    Object.keys(this.loginForm.controls).forEach(key => {
      this.loginForm.get(key)?.markAsDirty();
    })

    if (this.loginForm.valid){
      const requestBody: LoginRequest = {
        login:  this.loginForm.getRawValue().login,
        password: this.loginForm.getRawValue().password
      }
      this.authService.loginUser(requestBody).subscribe(
        {
          next: () => {this.router.navigate(["user"])},
          error: (err) => console.log(err)
        }
      )
    }
  }

}
