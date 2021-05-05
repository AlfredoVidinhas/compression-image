import { Component, OnInit } from '@angular/core';

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
  ]

  ngOnInit(): void {
  }

  ReceberImagens($events){
    this.ListaImagens = $events.previews;

    var reader = new FileReader();
    reader.readAsDataURL($events.original);
    reader.onload = (_event) => {
      this.OriginalImage = reader.result;
    }
  }

  AbrirImagem(image: string){
    this.images = [this.OriginalImage, image];
    this.isPreviewVisible = true;
  }

  FecharImagem(){
    this.isPreviewVisible = false;
  }

}
