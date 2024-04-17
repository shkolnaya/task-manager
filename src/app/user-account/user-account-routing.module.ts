import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContainerComponent } from './container/container.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { TasksPageComponent } from './tasks-page/tasks-page.component';
import { SettingsPageComponent } from './settings-page/settings-page.component';
import { ProjectsPageComponent } from './projects-page/projects-page.component';
import { ProjectTasksComponent } from './projects-page/project-tasks/project-tasks.component';
import { UserAccountGuard } from './user-account.guard';


const routes: Routes = [
    {
        path: '', 
        component: ContainerComponent,
        canActivate: [UserAccountGuard],
        children: [
            {
                path: '',
                redirectTo: 'tasks',
                pathMatch: 'full'
            },
            {
                path: 'dashboard',
                component: DashboardPageComponent
            },
            {
                path: 'tasks',
                component: TasksPageComponent
            },
            {
                path: 'projects',
                component: ProjectsPageComponent
            },
            {
                path: 'projects/:id', 
                component: ProjectTasksComponent
            },
            {
                path: 'settings',
                component: SettingsPageComponent
            },
        ]
    }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserAccountRoutingModule { }
