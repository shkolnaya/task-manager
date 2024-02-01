import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from './container/container.component';
import { UserAccountRoutingModule } from './user-account-routing.module';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { TasksPageComponent } from './tasks-page/tasks-page.component';
import { SettingsPageComponent } from './settings-page/settings-page.component';
import { TaskComponent } from './tasks-page/task/task.component';



@NgModule({
  declarations: [
    ContainerComponent,
    DashboardPageComponent,
    TasksPageComponent,
    SettingsPageComponent,
    TaskComponent,
  ],
  imports: [
    CommonModule,
    UserAccountRoutingModule
  ]
})
export class UserAccountModule { }
