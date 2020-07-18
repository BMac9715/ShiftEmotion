import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs';
import { History } from './../model/history';
import { EncrDecrService } from '../services/encr-decr.service';
import { ResponseEmpotion } from '../model/response-empotion';
import { ResponseByGender } from '../model/response-by-gender';


const API: string = 'https://6ee7dz1b3a.execute-api.us-east-1.amazonaws.com/beta'
const KEY: string = '123456$#@$^@1ERF';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  JWT:string;
  
  constructor(private http: HttpClient, private EncrDecr:EncrDecrService) { 
    //this.JWT= "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyRW1haWwiOiJzYm9uaWxsYWd0QGdtYWlsLmNvbSIsInNjb3BlcyI6IlJlZ2lzdGVyIFNwb3RpZnlBdXRoX1RvcFRyYWNrcyBMb2dpbiBEZXRlY3RFbW90aW9uIFNwb3RpZnlSZWNvbW1lbmRhdGlvbiBIaXN0b3J5IFJlY29tbWVuZGF0aW9uQnlFbW90aW9uIFJlY29tbWVuZGF0aW9uc0J5R2VuZGVyIFNwb3RpZnlMb2dpbiIsImV4cCI6MTU5NDYxMTkyOH0.BDnlNlpnWhNIJU3oVNo2fxF0LSJDChwrHa37biZHLgs"
  }

  userLogin(email:string, password:string): Observable<any>{

    var passEncr = this.EncrDecr.set({KEY}, password);
    
    var body = { email: email, password: passEncr};

    return this.http.post<any>(`${API}/Login`, body);
  }

  userRegister(name:string, lastname:string, email:string, 
    password:string, gender:string,  birthdate: Date): Observable<any>{
    
    var passEncr = this.EncrDecr.set({KEY}, password);

    var body = {
                name: name, 
                lastname: lastname, 
                email: email, 
                password: passEncr, 
                gender: Number.parseInt(gender), 
                birthDate: birthdate
              };
    
    return this.http.post<any>(`${API}/Register`, body);
  }
  
  getHistory(idUser: string): Observable<History>{
     this.JWT= localStorage.getItem('JWT');
    const headers = new HttpHeaders({'Authorization': this.JWT});
    return this.http.post<History>(`${API}/History`,{userId:idUser},{headers: headers})
  }
  
  getRecommendationGender(): Observable<ResponseByGender>{
    this.JWT= localStorage.getItem('JWT');
    const headers = new HttpHeaders({'Authorization': this.JWT});
    console.log(headers);
    return this.http.post<ResponseByGender>(`${API}/RecommendationsByGender`,{headers: headers});
  }

  getRecommendationEmotion(): Observable<ResponseEmpotion>{
    this.JWT= localStorage.getItem('JWT');
    const headers = new HttpHeaders({'Authorization': this.JWT});
    console.log(headers);
    return this.http.post<ResponseEmpotion>(`${API}/RecommendationByEmotion`,{headers: headers})
  }

  userAuthSpotify(userid:string, code:string): Observable<any> {
    
    var header = { 'Cache-Control': 'no-cache'}
    
    var body = {
      userId: Number.parseInt(userid),
      code: code
    };

    return this.http.post<any>(`${API}/SpotifyAuth_TopTracks`, body, { headers: header});
  }

  detectEmotion(user, image, token): Observable<any>{
    var header = { 'Authorization': token };

    var body = {
      userId: user,
      image: image.toString()
    }

    return this.http.post<any>(`${API}/DetectEmotion`, body, {'headers': header });
  }

  spotifyRecommendation(mood, userid, idresult, token): Observable<any>{
    var header = { 'Authorization': token };

    var body = {
      mood: mood,
      userId: userid,
      idResult: idresult
    }
    return this.http.post<any>(`${API}/SpotifyRecommendation`, body, {'headers': header });
  }

}
