import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export enum FormContent{
  Login,
  Registration
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  @Input()
  isOpened: boolean;

  @Output()
  isOpenedChange = new EventEmitter<boolean>();

  formContentEnum = FormContent;

  loginText: string = 'Sign in';
  registrationText: string = 'Sign up';

  formContent: FormContent = FormContent.Login;
  headerButtonText: string = this.registrationText;

  constructor() { }

  ngOnInit(): void {
  }

  changeContent() {
    if (this.formContent == FormContent.Login) {
      this.formContent = FormContent.Registration;
      this.headerButtonText = this.loginText;
    } else {
      this.formContent = FormContent.Login;
      this.headerButtonText = this.registrationText;
    }    
  }

  closeForm() {
    this.isOpenedChange.emit(false);
  }

}
