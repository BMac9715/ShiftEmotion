import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopbarDashBoardComponent } from './topbar-dash-board/topbar-dash-board.component';
import { SidebarDashBoardComponent } from './sidebar-dash-board/sidebar-dash-board.component';
import { FooterDashboardComponent } from './footer-dashboard/footer-dashboard.component';
import { RouterModule } from '@angular/router';
import { FlexModule } from '@angular/flex-layout';



@NgModule({
  declarations: [
    TopbarDashBoardComponent,
    SidebarDashBoardComponent,
    FooterDashboardComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FlexModule
  ],
  exports: [
    TopbarDashBoardComponent,
    SidebarDashBoardComponent,
    FooterDashboardComponent
  ]
})
export class ComponentsModule { }
