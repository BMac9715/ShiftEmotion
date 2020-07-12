import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LayoutModule } from './layout/layout.module';
import { DefaultModule } from './layout/default/default.module';
import { SidebarDashBoardComponent } from './components/sidebar-dash-board/sidebar-dash-board.component';
import { HttpClientModule } from '@angular/common/http';
import { SigninComponent } from './components/signin/signin.component';
import { ReportComponent } from './components/report/report.component';
import { ChartsModule } from 'ng2-charts';
import { SignupComponent } from './components/signup/signup.component';
import { FormsModule } from '@angular/forms';
import { EncrDecrService } from '../app/services/encr-decr.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignupComponent,
    SigninComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    DefaultModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [EncrDecrService], 
  bootstrap: [AppComponent]
})
export class AppModule { }
