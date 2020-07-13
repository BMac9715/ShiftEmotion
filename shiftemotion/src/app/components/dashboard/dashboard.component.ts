import { Component, OnInit, Input } from '@angular/core';
import { ItemHistory } from 'src/app/model/item-history';
import { ApiService } from 'src/app/services/api.service';
import { History } from 'src/app/model/history';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  // Canción por Default Dua Lipa
  trackUrl='spotify:track:6WrI0LAC5M1Rw2MnX2ZvEg'
  defSong:ItemHistory = {
    tipo_emocion: "8",
    descripcion: "HAPPY",
    nivel_confianza: 99.4202,
    nombre_cancion: "Ay Corazu00f3n",
    artista: "Cali Y El Dandee",
    link: "spotify:track:3DN6Gss0WIEMXc1AvnrAA5",
    fecha_transaccion: "2020-07-04 20:02:37"
}
  
  //Creación de URI
  public spotifyUri: string;
  
  // Cali el DANDE
  //trackUrl='spotify:track:3DN6Gss0WIEMXc1AvnrAA5'
  public urlSafe:DomSanitizer

  setTrack(song: ItemHistory){
    this.defSong=song
    this.spotifyUri='https://open.spotify.com/embed/track/'+ this.defSong.link.replace('spotify:track:','')
    console.log(this.spotifyUri)

    var t = JSON.parse(localStorage.getItem("ResponseTime"));
    
    if(t != null){
      var fin = new Date().getTime();
      var start = t.start;
      console.log(fin - start);
    }

    return this._domSanitizer.bypassSecurityTrustResourceUrl(this.spotifyUri)
  }

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
  idUser:string = localStorage.getItem('UID');
  

  constructor(private _domSanitizer:DomSanitizer, private servicio: ApiService) { 
    servicio.getHistory(this.idUser).subscribe((res:History) =>{
        this.songsHistory=res.history;
        if (res.history.length>0) {
          this.defSong=res.history[0];
        }
    },err =>{
      console.log(err)
    });
  }

  recommendationDetected(event){

    var song = JSON.parse(event);

    var itemH = new ItemHistory();
    itemH.tipo_emocion = song.tip_emocion;
    itemH.descripcion = song.emocion;
    itemH.nivel_confianza = Number.parseInt(song.lvlConf);
    itemH.nombre_cancion = song.cancion;
    itemH.artista = song.artista;
    itemH.link = song.link;
    itemH.fecha_transaccion = "";

    this.setTrack(itemH);
  }

  ngOnInit(): void {
  }

}
