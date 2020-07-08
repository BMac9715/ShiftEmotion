import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FlexLayoutModule } from '@angular/flex-layout';
import { DefaultComponent } from './default.component';
import { HistoryComponent } from 'src/app/components/history/history.component';
import { RouterModule } from '@angular/router';
import { SidebarDashBoardComponent } from 'src/app/components/sidebar-dash-board/sidebar-dash-board.component';
import { ComponentsModule } from 'src/app/components/components.module';


@NgModule({
  declarations: [
    DefaultComponent,
    HistoryComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    RouterModule,
    ComponentsModule
  ]
})
export class DefaultModule { }
