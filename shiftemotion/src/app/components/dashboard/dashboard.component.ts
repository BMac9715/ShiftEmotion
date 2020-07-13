import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
//"https://open.spotify.com/embed/track/6rqhFgbbKwnb9MLmUQDhG6"
  //spotifyURl='https://open.spotify.com/embed/track/';
  
  
  public spotifyURl: String;
  trackUrl='3DN6Gss0WIEMXc1AvnrAA5';
  constructor() { 
    this.spotifyURl='https://open.spotify.com/embed/track/6rqhFgbbKwnb9MLmUQDhG6'
  }

  ngOnInit(): void {
  }

}
