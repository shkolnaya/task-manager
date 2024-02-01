import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContainerComponent } from './container/container.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { TasksPageComponent } from './tasks-page/tasks-page.component';
import { SettingsPageComponent } from './settings-page/settings-page.component';


const routes: Routes = [
    {
        path: '', 
        component: ContainerComponent,
        children: [
            {
                path: '',
                redirectTo: 'dashboard',
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
