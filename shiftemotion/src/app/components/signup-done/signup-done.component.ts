import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-signup-done',
  templateUrl: './signup-done.component.html',
  styleUrls: ['./signup-done.component.css']
})
export class SignupDoneComponent implements OnInit {

  code:string;
  state:string;
  err:string;
  error:string;

  constructor(private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe(
      params => {
        this.code = params['code'];
        this.state =params['state'];
        this.err = params['error'];
      }
    )
   }

  ngOnInit(): void {
    if(this.err==="access_denied"){
      this.error = "*Nota: No se ha concedido el acceso a Spotify.";
    }
  }

}
