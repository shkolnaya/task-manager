import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {

  hide = true;
  registrationForm: FormGroup;

  constructor(private authService: AuthenticationService){}

  ngOnInit(): void {
    this.registrationForm = new FormGroup({
      login: new FormControl('', Validators.required),
      fullName: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.minLength(5)]),
      confirmPassword: new FormControl('', Validators.required),
    })

  }

  onRegistrationFormSubmit() {
    Object.keys(this.registrationForm.controls).forEach(key => {
      this.registrationForm.get(key)?.markAsDirty();
    })

    if (this.registrationForm.valid) {
      this.authService.registerUser(this.registrationForm.getRawValue()).subscribe(
        {
          next: () => {},
          error: (err) => console.log(err)
        }
      )
    }
  }

}
