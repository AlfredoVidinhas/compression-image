import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  title = 'compression-image';

  ListaImagens;

  OriginalImage;

  isPreviewVisible = false;

  public images: string[] = [
    '/assets/image.jpg',
    '/assets/image.jpg',
  ];

  options: AnimationOptions = {
    path: '/assets/sad.json',
  };

  constructor(@Inject(DOCUMENT) private document){

  }

  ngOnInit(): void {
  }

  ReceberImagens($events){
    if($events){
      this.ListaImagens = $events.previews.filter(p => p != null);
      console.log(this.ListaImagens)
      var reader = new FileReader();
      reader.readAsDataURL($events.original);
      reader.onload = (_event) => {
        this.OriginalImage = reader.result;
      }

      this.ScrollDown();
    }
    else{
      this.ListaImagens = null;
    }
  }

  AbrirImagem(image: string){
    this.images = [this.OriginalImage, image];
    this.isPreviewVisible = true;
  }

  FecharImagem(){
    this.isPreviewVisible = false;
  }

  ScrollDown(){
    const element = this.document.getElementById('teste');
    console.log(element)
    element.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'});
  }

  animationCreated(animationItem: AnimationItem): void {
    console.log(animationItem);
  }

}
