import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {HistoryComponent} from "./components/history/history.component";
import { DefaultComponent } from './layout/default/default.component';
import { SidebarDashBoardComponent } from './components/sidebar-dash-board/sidebar-dash-board.component';


const routes: Routes = [
  //{path:'', pathMatch:'full', redirectTo:'home'},
  //{path:'', pathMatch:'full', redirectTo:'dashboard'},
  {path:'',
    component: DefaultComponent,
    children: [{
      path: 'history',
      component: HistoryComponent
    },{
      path: 'dashboard',
      component:DashboardComponent}
  ]},
  // {path: 'dashboard', component:DashboardComponent},
  {path: 'home', component:HomeComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
