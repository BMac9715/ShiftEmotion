import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LayoutModule } from './layout/layout.module';
import { DefaultModule } from './layout/default/default.module';
import { SidebarDashBoardComponent } from './components/sidebar-dash-board/sidebar-dash-board.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    DefaultModule
  ],
  providers: [], 
  bootstrap: [AppComponent]
})
export class AppModule { }
