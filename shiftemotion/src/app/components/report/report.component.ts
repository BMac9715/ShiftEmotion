import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Emotion } from 'src/app/model/emotion';
import { ResponseEmpotion } from 'src/app/model/response-empotion';
import { ChartOptions, ChartType } from 'chart.js';
import { Label, SingleDataSet, monkeyPatchChartJsTooltip, monkeyPatchChartJsLegend } from 'ng2-charts';
import { Gender } from 'src/app/model/gender';
import { ResponseByGender } from 'src/app/model/response-by-gender';


@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  emotions: Emotion[]
  gender: Gender[]

    // Pie
    public pieChartOptions: ChartOptions = {
      responsive: true,
    };

    public chartColors: Array<any> = [ 
      { backgroundColor:["#6FC8CE","#FF7360"] }]; 

    public pieChartLabels: Label[] = ['Masculino','Femenino'];
    public pieChartData: SingleDataSet = [];
    public pieChartType: ChartType = 'pie';
    public pieChartLegend = true;
    public pieChartPlugins = [];

    totalRecomendaciones =0
    totalEmociones=0
    generoMayor:string
    isAdmin:boolean
 
  constructor(private servicio: ApiService){

    servicio.getRecommendationEmotion().subscribe((res:ResponseEmpotion) =>{
      console.log(res) 
      this.isAdmin=res.result
        this.emotions=res.results;

        for (let index = 0; index < this.emotions.length; index++) {
          this.totalEmociones+=(+this.emotions[index].amount)
        }
        
    },err =>{
      this.isAdmin=false

      console.log(err)
    });

    servicio.getRecommendationGender().subscribe((res:ResponseByGender) =>{
      console.log(res) 
       
        this.gender=res.results;  
        for (let index = 0; index < this.gender.length; index++) {
          this.pieChartData.push(this.gender[index].amount)
          this.totalRecomendaciones+=(+this.gender[index].amount)
          console.log(this.totalRecomendaciones);
          //this.pieChartLabels.push(this.gender[index].desc) // ** Falta validar que idioma vamos a presentar...
        }
        if (this.gender[0]>this.gender[1]) {
          this.generoMayor="Masculino"
        }else{this.generoMayor="Femenino"}

    },err =>{
      console.log(err)
    });





    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }



  
  

  

  ngOnInit(): void {
  }

  

}
