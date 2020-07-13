import { Component, OnInit } from '@angular/core';
import { History } from './../../model/history';
import { ApiService } from './../../services/api.service';
import { ItemHistory } from 'src/app/model/item-history';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {


  titleTables = [
    "Tipo de Emoción",
    "Descripción",
    "Nivel de Confianza",
    "Nombre de la Canción",
    "Artista",
    "Fecha de busqueda",
    "Link"
  ]

  goTrack(urlSpotify: string){
    console.log("Print Song" + urlSpotify)
  }

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
