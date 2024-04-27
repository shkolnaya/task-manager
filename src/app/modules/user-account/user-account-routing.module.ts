import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContainerComponent } from './components/container/container.component';
import { UserAccountGuard } from './guards/user-account.guard';
import { DashboardPageComponent } from './components/container/dashboard-page/dashboard-page.component';
import { TasksPageComponent } from './components/container/tasks-page/tasks-page.component';
import { ProjectsPageComponent } from './components/container/projects-page/projects-page.component';
import { ProjectTasksComponent } from './components/container/projects-page/project-tasks/project-tasks.component';
import { SettingsPageComponent } from './components/container/settings-page/settings-page.component';


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
