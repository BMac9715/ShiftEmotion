import { Component, OnInit, ElementRef, Renderer2, ViewChild, asNativeElements } from '@angular/core';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.css']
})
export class CameraComponent implements OnInit {

  @ViewChild('video', { static: true }) videoElement: ElementRef;
  @ViewChild('canvas', { static: true }) canvas: ElementRef;

  constraints = {
    video: {
        facingMode: "environment",
        width: { ideal: 1280 },
        height: { ideal: 720 }
    }
  };

videoWidth = 1280;
videoHeight = 720;
localstream;

showcamera:boolean;
defaultImage:boolean;
isStop:boolean;
takePhoto:boolean;
disablePhoto:boolean;

uploadImage = new Image();
url;

  constructor(private renderer: Renderer2) { }

  ngOnInit() {
    this.showcamera = false;
    this.defaultImage = true;
    this.isStop = true;
    this.takePhoto = true;
    this.disablePhoto = false;
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
    }
  }

  getRecommendation(){
    if(this.defaultImage){
      console.log("No has cargado una fotografia, para acceder al sistema de recomendación debes cargar una fotografía.");
      alert("No usar Imagen Default :c")
    }
    else{
      //Aqui ya se carga la imagen y se ejecuta la lambda Dx
      alert("Utilizar la Lambda AWS");
    }
  }

}
