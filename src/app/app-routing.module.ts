import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContainerComponent } from './user-account/container/container.component';
import { HomePageComponent } from './home-page/home-page.component';

const routes: Routes = [
  { 
    path: "user",
    loadChildren: () => import('./user-account/user-account.module').then(m => m.UserAccountModule)
  },
  {
    path: "",
    component: HomePageComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
