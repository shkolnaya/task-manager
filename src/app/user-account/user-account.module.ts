import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from './container/container.component';
import { UserAccountRoutingModule } from './user-account-routing.module';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { TasksPageComponent } from './tasks-page/tasks-page.component';
import { SettingsPageComponent } from './settings-page/settings-page.component';
import { TaskComponent } from './tasks-page/task/task.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { TaskFormComponent } from './tasks-page/task-form/task-form.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatDateFormats, MatNativeDateModule } from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSelectModule} from '@angular/material/select';
import { MomentDatePipe } from './moment-date.pipe';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { ProjectsPageComponent } from './projects-page/projects-page.component';
import { ProjectComponent } from './projects-page/project/project.component';
import { AddProjectButtonComponent } from './projects-page/add-project-button/add-project-button.component';
import { CalendarTaskComponent } from './tasks-page/calendar-task/calendar-task.component';
import {MatTableModule} from '@angular/material/table';
import { CalendarCellComponent } from './tasks-page/calendar-task/calendar-cell/calendar-cell.component';
import { TaskFilterPipe } from './tasks-page/calendar-task/task-filter.pipe';
import { TableTaskComponent } from './tasks-page/table-task/table-task.component';
import { MatSortModule } from '@angular/material/sort';
import { ProjectTasksComponent } from './projects-page/project-tasks/project-tasks.component';
import { ProjectNamePipe } from './project-name.pipe';
import { PickIconComponent } from './projects-page/pick-icon/pick-icon.component';
import { ProjectFormComponent } from './projects-page/project-form/project-form.component';

const dateFormat = 'MMM D, YYYY'

const dateFormats: MatDateFormats = {
  parse: {
    dateInput: [dateFormat]
  },
  display: {
      dateInput: dateFormat,
      monthYearLabel: 'MMM YYYY',
      dateA11yLabel: 'LL',
      monthYearA11yLabel: 'MMMM YYYY',
  } 
}

@NgModule({
  declarations: [
    ContainerComponent,
    DashboardPageComponent,
    TasksPageComponent,
    SettingsPageComponent,
    TaskComponent,
    TaskFormComponent,
    MomentDatePipe,
    ProjectsPageComponent,
    ProjectComponent,
    AddProjectButtonComponent,
    CalendarTaskComponent,
    CalendarCellComponent,
    TaskFilterPipe,
    TableTaskComponent,
    ProjectTasksComponent,
    ProjectNamePipe,
    PickIconComponent,
    ProjectFormComponent,
  ],
  imports: [
    CommonModule,
    UserAccountRoutingModule,
    DragDropModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatSelectModule,
    MatTableModule,
    MatSortModule
  ],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: dateFormats},
  ]
})
export class UserAccountModule { }
