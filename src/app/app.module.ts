import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgChartsModule } from 'ng2-charts';
import { HomePageComponent } from './components/home-page/home-page.component';
import { AppComponent } from './components/app.component';
import { FormComponent } from './components/home-page/forms/form.component';
import { LoginComponent } from './components/home-page/forms/login/login.component';
import { RegistrationComponent } from './components/home-page/forms/registration/registration.component';
import { ErrorMessageComponent } from './components/home-page/forms/error-message/error-message.component';


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    FormComponent,
    LoginComponent,
    RegistrationComponent,
    ErrorMessageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
