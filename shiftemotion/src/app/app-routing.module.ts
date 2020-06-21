import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';


const routes: Routes = [
  //{path:'', pathMatch:'full', redirectTo:'home'},
  {path:'', pathMatch:'full', redirectTo:'dashboard'},
  {path: 'dashboard', component:DashboardComponent},
  {path: 'home', component:HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
