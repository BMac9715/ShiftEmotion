import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar-dash-board',
  templateUrl: './sidebar-dash-board.component.html',
  styleUrls: ['./sidebar-dash-board.component.css']
})
export class SidebarDashBoardComponent implements OnInit {

  showReports:boolean;

  constructor() { }

  ngOnInit(): void {
    this.showReports = ! (localStorage.getItem("Admin") === "true");
  }

}
