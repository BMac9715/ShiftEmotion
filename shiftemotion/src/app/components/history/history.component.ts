import { Component, OnInit, Output } from '@angular/core';
import { History } from './../../model/history';
import { ApiService } from './../../services/api.service';
import { ItemHistory } from 'src/app/model/item-history';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { EventEmitter } from 'protractor';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {


  goTrack(urlSpotify: string){
    console.log("Print Song" + urlSpotify)
    
  }

  titleTables = [
    "Tipo de Emoción",
    "Descripción",
    "Nivel de Confianza",
    "Nombre de la Canción",
    "Artista",
    "Fecha de busqueda",
    "Link"
  ]

  songsHistory:ItemHistory[]

  constructor(private servicio: ApiService){
    servicio.getHistory('7').subscribe((res:History) =>{
      console.log(res)
        this.songsHistory=res.history;
      console.log("HISTORIAL CANCIONES")  
      console.log(this.songsHistory)

    },err =>{
      console.log(err)
    });

  }

  ngOnInit(): void {
    
  }

}
