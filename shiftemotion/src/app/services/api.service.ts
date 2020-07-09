import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { History } from './../model/history';
import * as aws4 from "ngx-aws4";

const API: string = 'https://6ee7dz1b3a.execute-api.us-east-1.amazonaws.com'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  
  constructor(private http: HttpClient) { 

  }

  //GETS
  
  ObtenerPrueba(): Observable<any>{
    return this.http.get<any>(`${API}/beta/RecommendationsByGender`,{})
  }

 

  //POSTS
  getHistory(idUser: string): Observable<History>{
    return this.http.post<History>(`${API}/beta/History`,{userId:idUser})
  }




}
