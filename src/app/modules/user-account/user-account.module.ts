import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from './components/container/container.component';
import { UserAccountRoutingModule } from './user-account-routing.module';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatDateFormats, MatNativeDateModule } from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSelectModule} from '@angular/material/select';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import {MatTableModule} from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatMenuModule} from '@angular/material/menu';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { ProjectsService } from './services/projects.service';
import { TaskService } from './services/task.service';
import { DashboardPageComponent } from './components/container/dashboard-page/dashboard-page.component';
import { TasksPageComponent } from './components/container/tasks-page/tasks-page.component';
import { SettingsPageComponent } from './components/container/settings-page/settings-page.component';
import { TaskComponent } from './components/container/tasks-page/task/task.component';
import { TaskFormComponent } from './components/container/tasks-page/task-form/task-form.component';
import { MomentDatePipe } from './pipes/moment-date.pipe';
import { ProjectsPageComponent } from './components/container/projects-page/projects-page.component';
import { ProjectComponent } from './components/container/projects-page/project/project.component';
import { AddProjectButtonComponent } from './components/container/projects-page/add-project-button/add-project-button.component';
import { CalendarTaskComponent } from './components/container/tasks-page/calendar-task/calendar-task.component';
import { CalendarCellComponent } from './components/container/tasks-page/calendar-task/calendar-cell/calendar-cell.component';
import { TaskFilterPipe } from './components/container/tasks-page/calendar-task/task-filter.pipe';
import { TableTaskComponent } from './components/container/tasks-page/table-task/table-task.component';
import { ProjectTasksComponent } from './components/container/projects-page/project-tasks/project-tasks.component';
import { ProjectNamePipe } from './pipes/project-name.pipe';
import { PickIconComponent } from './components/container/projects-page/pick-icon/pick-icon.component';
import { ProjectFormComponent } from './components/container/projects-page/project-form/project-form.component';
import { ProjectsStatisticsComponent } from './components/container/dashboard-page/projects-statistics/projects-statistics.component';
import { DoneStatisticsComponent } from './components/container/dashboard-page/done-statistics/done-statistics.component';
import { ExpiredStatisticsComponent } from './components/container/dashboard-page/expired-statistics/expired-statistics.component';
import { CalendarStatisticsComponent } from './components/container/dashboard-page/calendar-statistics/calendar-statistics.component';
import { ColumnTasksComponent } from './components/container/tasks-page/column-tasks/column-tasks.component';
import { StatisticsService } from './components/container/dashboard-page/statistics.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';



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
    ProjectsStatisticsComponent,
    DoneStatisticsComponent,
    ExpiredStatisticsComponent,
    CalendarStatisticsComponent,
    ColumnTasksComponent,
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
    MatSortModule,
    MatCheckboxModule,
    MatMenuModule,
    HttpClientModule,
    MatProgressSpinnerModule
  ],
  providers: [
    ProjectsService,
    TaskService,
    StatisticsService,
    {
      provide: DateAdapter, 
      useClass: MomentDateAdapter, 
      deps: [MAT_DATE_LOCALE]
    },
    {
      provide: MAT_DATE_FORMATS, 
      useValue: dateFormats
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }
  ]
})
export class UserAccountModule { }
