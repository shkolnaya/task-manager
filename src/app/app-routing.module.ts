import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';

const routes: Routes = [
  { 
    path: "user",
    loadChildren: () => import('./modules/user-account/user-account.module').then(m => m.UserAccountModule)
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
