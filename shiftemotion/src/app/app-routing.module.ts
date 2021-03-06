import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DefaultComponent } from './layout/default/default.component';
import { SigninComponent } from './components/signin/signin.component';
import { ReportComponent } from './components/report/report.component';
import { SignupComponent } from './components/signup/signup.component';
import { SignupDoneComponent } from './components/signup-done/signup-done.component';
import { AuthGuardService as AuthGuard } from './services/auth-guard.service';


const routes: Routes = [
  { path:'',
    component: HomeComponent,
    children:[{
      path: 'signin',
      component:SigninComponent
    },
    {
      path: 'signup',
      component:SignupComponent
    },
    {
      path: 'signupdone',
      component:SignupDoneComponent
    }  
  ]
  },
  { path:'inicio',
    component: DefaultComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
    {
      path: 'dashboard',
      component:DashboardComponent
    },
    {
      path: 'report',
      component:ReportComponent
    }
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
