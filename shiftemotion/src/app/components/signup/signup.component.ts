import { Component, OnInit, Inject } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {

  //Data Form
  name: string;
  lastname: string;
  email: string;
  password: string;
  confirmPassword: string;
  birth: Date;
  error: string;
  gender: number;

  //Var
  userid:number;

  constructor(private api:ApiService, readonly router: Router, @Inject(DOCUMENT) readonly document: Document) { 
    this.name = "";
    this.lastname = "";
    this.email = "";
    this.password = "";
    this.confirmPassword = "";
    this.birth = new Date();
    this.error = "";
    this.gender = 0;
  }

  ngOnInit(): void {
  }

  get window(): Window { return this.document.defaultView; }

  register(){
    this.error = "";

    if( this.name === "" || this.lastname === "" 
      || this.email === ""|| this.password === "" 
      || this.confirmPassword === "")
    {
      this.error = "Los campos requeridos no pueden ser vacios.";
    }
    else{  
      if(this.password === this.confirmPassword){       
        
        console.log(this.birth);
        
        this.api.userRegister(this.name, this.lastname, this.email, this.password, this.gender.toString(), this.birth)
        .subscribe(
          res => {
            if(res.result){
              localStorage.setItem("UID", res.UID);
              this.redirect(res.auth_link);            
            }else{
              this.error = "Try Again. " + res.message;
            }
          }
        );
      }
      else{
        this.error = "Las contraseñas ingresadas deben ser iguales."
      }
    }
  }

  chooseGender(event){
    this.gender = event.target.value;
  }

  redirect(url: string): Promise<boolean> {
    let  target = '_blank';
    this.router.navigate(['']); 

    return new Promise<boolean>( (resolve, reject) => {  
     try { resolve(!!this.window.open(url, target)); }
     catch(e) { reject(e); }
  });
}

}
