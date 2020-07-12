import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LayoutModule } from './layout/layout.module';
import { DefaultModule } from './layout/default/default.module';
// import { aws4 }from 'aws4';
// import {CryptoJS} from 'crypto-js'
import { SidebarDashBoardComponent } from './components/sidebar-dash-board/sidebar-dash-board.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { SigninComponent } from './components/signin/signin.component';
import { CameraComponent } from './components/camera/camera.component';
import { ReportComponent } from './components/report/report.component';
import { ChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegistrationComponent,
    SigninComponent,
    CameraComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    DefaultModule,
    HttpClientModule

  ],
  providers: [], 
  bootstrap: [AppComponent]
})
export class AppModule { }
