import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  display:boolean;

  constructor() { 
    this.display = false;
  }

  ngOnInit(): void {
    
  }

  onActivate(){
    this.display = true;
  }

  onDeactivate(){
    this.display = false;
  }

}
