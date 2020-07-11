import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EncrDecrService } from '../services/encr-decr.service';
import { map } from 'rxjs/operators';
import * as aws4 from "ngx-aws4";

const API: string = 'https://6ee7dz1b3a.execute-api.us-east-1.amazonaws.com'
const KEY: string = '123456$#@$^@1ERF';
const httpHeadersAPI = new HttpHeaders({
  'Content-Type': 'application/json',
  'Accept': '*/*'
});

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  constructor(private http: HttpClient, private EncrDecr:EncrDecrService) { 

  }

  //GETS
  
  ObtenerPrueba(): Observable<any>{
    return this.http.get<any>(`${API}/beta/RecommendationsByGender`,{})
  }

  //POSTS

  userLogin(email:string, password:string): Observable<any>{

    var passEncr = this.EncrDecr.set({KEY}, password);
    
    var body = { email: email, password: password};

    return this.http.post<any>(`${API}/beta/Login`, body);
  }

  userRegister(name:string, lastname:string, email:string, 
    password:string, gender:string,  birthdate: Date): Observable<any>{
    
    var passEncr = this.EncrDecr.set({KEY}, password);

    console.log(gender);

    var body = {
                name: name, 
                lastname: lastname, 
                email: email, 
                password: passEncr, 
                gender: Number.parseInt(gender), 
                birthDate: birthdate
              };
    
    return this.http.post<any>(`${API}/beta/Register`, body);
  }

  





}
