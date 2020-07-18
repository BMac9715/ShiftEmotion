import { Component, OnInit, Input,HostListener, ElementRef } from '@angular/core';
import { ItemHistory } from 'src/app/model/item-history';
import { ApiService } from 'src/app/services/api.service';
import { History } from 'src/app/model/history';
import { DomSanitizer  } from '@angular/platform-browser';


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
    // var t = JSON.parse(localStorage.getItem("ResponseTime"));
    
    // if(t != null){
    //   var fin = new Date().getTime();
    //   var start = t.start;
    //   console.log(fin - start);
    // }

    return this._domSanitizer.bypassSecurityTrustResourceUrl(this.spotifyUri)
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

  setHistory(){
    this.servicio.getHistory(this.idUser).subscribe((res:History) =>{
      this.songsHistory=res.history.slice().reverse();
      if (res.history.length>0) {
        this.defSong=this.songsHistory[0];
        //this.setTrack(this.defSong);
      }
    },err =>{
    console.log(err)
    });
  }

  constructor(private _domSanitizer:DomSanitizer, private servicio: ApiService) {}
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

    this.setHistory();
    this.setTrack(itemH);
    
  }

  isShow: boolean;
  topPosToStartShowing = 100;

  @HostListener('window:scroll')
  checkScroll() {
      
    // window의 scroll top
    // Both window.pageYOffset and document.documentElement.scrollTop returns the same result in all the cases. window.pageYOffset is not supported below IE 9.

    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    //console.log('[scroll]', scrollPosition);
    
    if (scrollPosition >= this.topPosToStartShowing) {
      this.isShow = true;
    } else {
      this.isShow = false;
    }
  }

  // TODO: Cross browsing
  gotoTop() {
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
  }

  ngOnInit(): void {
    this.setHistory()
  }

}
