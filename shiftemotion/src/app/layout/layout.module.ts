import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { AppRoutingModule } from '../app-routing.module';

import {FlexLayoutModule} from '@angular/flex-layout';
import { DefaultModule } from './default/default.module';



@NgModule({
  declarations: [NavbarComponent, FooterComponent],
  exports: [NavbarComponent, FooterComponent], 
  imports: [
    CommonModule,
    AppRoutingModule,
    FlexLayoutModule
  ]
})
export class LayoutModule { }
