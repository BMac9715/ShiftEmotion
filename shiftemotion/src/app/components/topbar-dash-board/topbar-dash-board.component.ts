import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topbar-dash-board',
  templateUrl: './topbar-dash-board.component.html',
  styleUrls: ['./topbar-dash-board.component.css']
})
export class TopbarDashBoardComponent implements OnInit {

  name:string = localStorage.getItem('UserName')

  constructor(private router: Router) { 

  }

  ngOnInit(): void {
  }

  LogOut(){
    localStorage.clear();

    this.router.navigate(['../']);
  }

}
