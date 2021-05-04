import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'compression-image';

  ListaImagens = [
    {Imagem: 'assets/image.jpg', Tamanho: '2MB', Percentagem: '25%'},
    {Imagem: 'assets/image.jpg', Tamanho: '2MB', Percentagem: '25%'},
    {Imagem: 'assets/image.jpg', Tamanho: '2MB', Percentagem: '25%'},
    {Imagem: 'assets/image.jpg', Tamanho: '2MB', Percentagem: '25%'},
    {Imagem: 'assets/image.jpg', Tamanho: '2MB', Percentagem: '25%'},
    {Imagem: 'assets/image.jpg', Tamanho: '2MB', Percentagem: '25%'}
  ];


  ngOnInit(): void {
  }
}
