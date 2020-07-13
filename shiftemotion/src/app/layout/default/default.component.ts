import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css']
})
export class DefaultComponent implements OnInit {

  constructor(readonly router: Router ) { }

  ngOnInit(): void {  
    this.router.navigate(['inicio/dashboard']); 
  }

}
