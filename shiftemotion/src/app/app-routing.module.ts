import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SigninComponent } from './components/signin/signin.component';
import { CameraComponent } from './components/camera/camera.component';


const routes: Routes = [
  {path:'', pathMatch:'full', redirectTo:'home'},
  {path: 'home', component:HomeComponent},
  {path: 'signin', component:SigninComponent},
  {path: 'camera', component:CameraComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
