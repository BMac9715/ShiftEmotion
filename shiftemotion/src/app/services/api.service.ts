import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs';
import { History } from './../model/history';
import * as aws4 from "ngx-aws4";
import { ResponseEmpotion } from '../model/response-empotion';
import { ResponseByGender } from '../model/response-by-gender';

const API: string = 'https://6ee7dz1b3a.execute-api.us-east-1.amazonaws.com'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  JWT: string
  

  constructor(private http: HttpClient) {
    this.JWT= "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyRW1haWwiOiJzYm9uaWxsYWd0QGdtYWlsLmNvbSIsInNjb3BlcyI6IlJlZ2lzdGVyIFNwb3RpZnlBdXRoX1RvcFRyYWNrcyBMb2dpbiBEZXRlY3RFbW90aW9uIFNwb3RpZnlSZWNvbW1lbmRhdGlvbiBIaXN0b3J5IFJlY29tbWVuZGF0aW9uQnlFbW90aW9uIFJlY29tbWVuZGF0aW9uc0J5R2VuZGVyIFNwb3RpZnlMb2dpbiIsImV4cCI6MTU5NDUzNzY3NX0.5PRk8tdzhSds-9F4s6hp-ld3tnFTDKtq3eJ_cDpDogM"

    
  }



  //GETS
  

  //POSTS
  getHistory(idUser: string): Observable<History>{
    const headers = new HttpHeaders({'Authorization': this.JWT});
    return this.http.post<History>(`${API}/beta/History`,{userId:idUser},{headers: headers})
  }

  getRecommendationEmotion(): Observable<ResponseEmpotion>{
    const headers = new HttpHeaders({'Authorization': this.JWT});
    console.log(headers);
    return this.http.get<ResponseEmpotion>(`${API}/beta/RecommendationByEmotion`,{headers: headers})
  }
  
  getRecommendationGender(): Observable<ResponseByGender>{
    const headers = new HttpHeaders({'Authorization': this.JWT});
    console.log(headers);
    return this.http.get<ResponseByGender>(`${API}/beta/RecommendationsByGender`,{headers: headers})
  }

}
