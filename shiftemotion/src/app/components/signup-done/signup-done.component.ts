import { Component, OnInit, APP_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-signup-done',
  templateUrl: './signup-done.component.html',
  styleUrls: ['./signup-done.component.css']
})
export class SignupDoneComponent implements OnInit {

  userid:string;
  code:string;
  state:string;
  err:string;
  error:string;

  constructor(private api:ApiService, private activatedRoute: ActivatedRoute) {

    this.activatedRoute.queryParams.subscribe(
      params => {
        this.code = params['code'];
        this.state =params['state'];
        this.err = params['error'];     
      }
    )
   }

  ngOnInit(): void {

    this.userid = localStorage.getItem("UID");

    this.api.userAuthSpotify(this.userid.toString(), this.code)
    .subscribe(
          res => {
            localStorage.setItem("AccessKey", res.accessToken);
            console.log("Creation Account Successfully");
          },
          err => {
            console.log(err.message);
          }
    );

    if(this.err==="access_denied"){
      this.error = "*Nota: No se ha concedido el acceso a Spotify.";
    }
  }

}
