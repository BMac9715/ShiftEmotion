import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
 
}) 


export class AppComponent {
  title = 'shiftemotion';

  @HostListener('window:beforeunload', ['$event'])
  beforeunloadHandler(event) {
    localStorage.clear();
  }
  
  constructor(){
  }
}


