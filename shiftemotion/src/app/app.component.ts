import { Component } from '@angular/core';
import * as aws4 from "ngx-aws4";
import { ApiService } from './services/api.service';
//import import * as aws4 from "ngx-aws4";* as CryptoJS from 'crypto-js' 
//import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
 
}) 


export class AppComponent {
  title = 'shiftemotion';
  
  constructor(private servicio: ApiService){
    servicio.ObtenerPrueba().subscribe((res) =>{
      console.log(res)
    },err =>{
      console.log(err)
    });

  }

}


