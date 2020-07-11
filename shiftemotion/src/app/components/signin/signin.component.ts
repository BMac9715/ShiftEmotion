import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { first, timeout } from 'rxjs/operators';
import { Constants } from 'src/app/shared/constants/constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  email: string
  pass: string
  error: string

  constructor(private api:ApiService, readonly router: Router) {
    this.email = "";
    this.pass = "";
    this.error = "";
   }

  ngOnInit(): void {
  }

  login(){

    this.error = "";
    
    if(this.email != ''){
      if(this.pass != ''){
        this.api.userLogin(this.email, this.pass)
        .subscribe(
          res => {
            console.log(res);

            if(res.result){
              localStorage.setItem("email", this.email);
              localStorage.setItem("jwt", res.JWT);
              this.router.navigate(['inicio']); 
            }
            else{
              this.error = res.message;
            }      
          }
        )
      }
      else{
        this.error = "Los campos requeridos no pueden ser vacios.";
      }
    }
    else{
      this.error = "Los campos requeridos no pueden ser vacios.";
    }
  }

}
