import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Emotion } from 'src/app/model/emotion';
import { ResponseEmpotion } from 'src/app/model/response-empotion';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  emotions: Emotion[]
 
  constructor(private servicio: ApiService){
    servicio.getRecommendationEmotion().subscribe((res:ResponseEmpotion) =>{
      console.log(res) 
        this.emotions=res.results;  
    },err =>{
      console.log(err)
    });
  }

  

  ngOnInit(): void {
  }

  

}
