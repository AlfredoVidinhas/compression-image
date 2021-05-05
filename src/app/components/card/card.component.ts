import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() Image: string;
  @Input() Percentagem: string;
  @Input() Tamanho: string;
  @Output() comparar = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  Comparar(){
    this.comparar.emit(this.Image);
  }

}
