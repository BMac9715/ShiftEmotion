import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LayoutModule } from './layout/layout.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HistoryComponent } from './components/history/history.component';
import { SidebarDashBoardComponent} from './components/sidebar-dash-board/sidebar-dash-board.component'
import {TopbarDashBoardComponent} from './components/topbar-dash-board/topbar-dash-board.component';
import { FooterDashboardComponent } from './components/footer-dashboard/footer-dashboard.component'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent,
    SidebarDashBoardComponent,
    TopbarDashBoardComponent,
    FooterDashboardComponent,
    HistoryComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
