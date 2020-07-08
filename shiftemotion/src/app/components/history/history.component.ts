import { Component, OnInit } from '@angular/core';
// import { history } from './../../model/history';
import { ApiService } from './../../services/api.service';

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

  testsongs = [
    {
    "tipo_emocion": "8",
    "descripcion": "HAPPY",
    "nivel_confianza": "99.4202",
    "nombre_cancion": "Ay Corazu00f3n",
    "artista": "Cali Y El Dandee",
    "link": "spotify:track:3DN6Gss0WIEMXc1AvnrAA5",
    "fecha_transaccion": "2020-07-04 20:06:36"
    }
  ]

  songsHistory = [];

  constructor(private servicio: ApiService){
    servicio.getHistory().subscribe((res) =>{
      console.log(res)
      for(let key in res)
          this.songsHistory.push(res[key])
    },err =>{
      console.log(err)
    });

  }

  ngOnInit(): void {
  }

}
