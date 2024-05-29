import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { SettingsService } from './settings.service';
import { User } from './user';

interface UserForm{
  fullName: FormControl<string | null>;
  phoneNumber: FormControl<string | null>;
  birthday: FormControl<moment.Moment | null>;
  biography: FormControl<string | null>;
}

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss']
})
export class SettingsPageComponent implements OnInit{

  user: User
  userForm: FormGroup
  

  constructor(private settingsService: SettingsService){}

  ngOnInit(): void {   
    this.userForm = new FormGroup<UserForm>({
      fullName: new FormControl<string>('', Validators.required),
      phoneNumber: new FormControl(''),
      birthday: new FormControl(moment()),
      biography: new FormControl<string>('')
    });

    this.settingsService.getUserInfo()
    .subscribe(
      res => {
        this.user = res;
        this.user.birthday = moment(res.birthday)
        this.userForm.patchValue(this.user)
      }
    );
  }

  submit() {
    if (this.userForm.valid){
      const userFormValue = this.userForm.getRawValue();
    }
  }
}
