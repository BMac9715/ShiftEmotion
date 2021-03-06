import { Component, OnInit, ElementRef, Renderer2, ViewChild, Output, EventEmitter } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.css']
})
export class CameraComponent implements OnInit {

  @ViewChild('video', { static: true }) videoElement: ElementRef;
  @ViewChild('canvas', { static: true }) canvas: ElementRef;

  @Output()
  recomendation: EventEmitter<string> = new EventEmitter<string>();
  
  constraints = {
    video: {
        facingMode: "environment",
        width: { ideal: 720 },
        height: { ideal: 480 }
    }
  };

videoWidth = 720;
videoHeight = 480;
localstream;

showcamera:boolean;
defaultImage:boolean;
isStop:boolean;
isCamera:boolean;
takePhoto:boolean;
disablePhoto:boolean;

uploadImage = new Image();
url;

//Var Response Emotion
mood:string;

  constructor(private renderer: Renderer2, private api:ApiService) { }

  ngOnInit() {
    this.showcamera = false;
    this.defaultImage = true;
    this.isStop = true;
    this.takePhoto = true;
    this.disablePhoto = false;
    this.isCamera = false;
    this.defaultCanvas();   
  }

  defaultCanvas(){
    this.uploadImage.src = '../../../assets/images/image-default.png';
    this.showcamera = false; 
    this.defaultImage = true;
    this.drawOnCanvas(this.uploadImage);  
  }

  drawOnCanvas(image){
    var context = this.canvas.nativeElement.getContext('2d');

    var baseImage = image;
    var iWidth = this.videoWidth;
    var iHeight = this.videoHeight;

    this.renderer.setProperty(this.canvas.nativeElement, 'width', this.videoWidth);
    this.renderer.setProperty(this.canvas.nativeElement, 'height', this.videoHeight);

    baseImage.onload = function(e){
      var wrh = baseImage.width / baseImage.height;
      var newWidth = iWidth / wrh;
      var newHeight = newWidth / wrh;

      if (newHeight > iHeight) {
        newHeight = iHeight;
        newWidth = newHeight * wrh;
      }
      var xOffset = newWidth < iWidth ? ((iWidth - newWidth) / 2) : 0;
      var yOffset = newHeight < iHeight ? ((iHeight - newHeight) / 2) : 0;

      context.drawImage(baseImage, xOffset, yOffset, newWidth, newHeight);
    }
  }

  startCamera() {
    this.isStop = false;
    this.showcamera = true;
    this.takePhoto = false;
    this.disablePhoto = false;
    if (!!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)) { 
           navigator.mediaDevices.getUserMedia(this.constraints).then(this.attachVideo.bind(this)).catch(this.handleError);
    } else {
        alert('Sorry, camera not available.');
    }
  }

  handleError(error) {
    console.log('Error: ', error);
  }

  attachVideo(stream) {
    this.localstream = stream;
    this.renderer.setProperty(this.videoElement.nativeElement, 'srcObject', stream);
    this.renderer.listen(this.videoElement.nativeElement, 'play', (event) => {
      this.videoHeight = this.videoElement.nativeElement.videoHeight;
      this.videoWidth = this.videoElement.nativeElement.videoWidth;
    });

    console.log(this.videoElement.nativeElement);

  }
  
  capture() {
    this.defaultImage = false;
    this.disablePhoto = true;
    this.canvas.nativeElement.getContext('2d').drawImage(this.videoElement.nativeElement, 0, 0);

    this.videoElement.nativeElement.pause();
    this.turnOffCamera();

    this.showcamera = false;
    this.isCamera = true;
  }
  
  turnOffCamera(){
    this.localstream.getTracks().forEach(track => track.stop())
    this.isStop = true;
  }

  clickUploadImage(){
    if(!this.isStop){
      this.turnOffCamera();
      this.defaultCanvas();
    }

    this.takePhoto = true;
    this.disablePhoto = false;
  }

  onFileSelected(event){
    if(event.target.files.length == 0){
      console.log("Cancel upload");
    }
    else{
      var reader = new FileReader();
      this.defaultImage = false;
      reader.onload = (event: any) => {
        this.url = event.target.result;
        this.uploadImage = document.getElementById("uploadImg") as HTMLImageElement;
        this.drawOnCanvas(this.uploadImage);
      };
  
      reader.readAsDataURL(event.target.files[0]);   
      this.isCamera = false;
    }
  }

  getRecommendation(){

    let t = {
      start: new Date().getTime()
    }

    localStorage.setItem("ResponseTime", JSON.stringify(t));

    var imgBase64;

    if(this.defaultImage){
      console.log("No has cargado una fotografia, para acceder al sistema de recomendación debes cargar una fotografía.");
      alert("No usar Imagen Default :c")
    }
    else{
      //Cargar Imagen de Canvas
      var canvasImg = document.getElementById("idCanvas") as HTMLCanvasElement;
      var imgData = canvasImg.toDataURL("image/png");
      imgBase64 = imgData.replace(/^data:image\/(png|jpg);base64,/, "");

      var userid = localStorage.getItem("UID");
      var token = localStorage.getItem("JWT");

      this.api.detectEmotion(userid, imgBase64, token)
      .subscribe(
        res => {
          if(res.result){
            var msg = JSON.parse(res.message);

            this.getSongRecommendation(msg.escala, userid, res.resultId, 
              msg.confidence, msg.id, msg.description,  token);

          }else{
            console.log(res.message);
          }
        },
        err => {
          alert("Ha sucedido un error." + err.message)
          console.log(err);
        }
      );

    }
  }

  sendRecommendation(song:string){
    this.recomendation.emit(song);
  }

  getSongRecommendation(mood, userId, idResult, confidence, tip_emotion, emotion, jwtToken){

    this.api.spotifyRecommendation(mood, userId, idResult, jwtToken)
    .subscribe(
      res => {
        var jSongDetected = {
          "tip_emocion": tip_emotion,
          "emocion": emotion,
          "lvlConf": confidence,
          "cancion": res.song_name,
          "artista": res.artist,
          "link": res.track_uri
        }
        this.defaultCanvas();
        this.sendRecommendation(JSON.stringify(jSongDetected));
      }
    );
  }

}
