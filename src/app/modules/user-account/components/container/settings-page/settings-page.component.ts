import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss']
})
export class SettingsPageComponent implements OnInit{

  userForm: FormGroup

  ngOnInit(): void {    
    this.userForm = new FormGroup({
      name: new FormControl<string>('', Validators.required),
      description: new FormControl(''),
      deadline: new FormControl(moment())
    });
  }
}
