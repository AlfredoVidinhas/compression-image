import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() Image: string;
  @Input() Percentagem: string;
  @Input() Tamanho: string;
  @Input() Name: string;
  @Input() File: string;
  @Output() comparar = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  DownloadBlob() {

    // Create a link element
    const link = document.createElement("a");

    // Set link's href to point to the Blob URL
    link.href = this.File;
    link.download = this.Name;

    // Append link to the body
    document.body.appendChild(link);

    // Dispatch click event on the link
    // This is necessary as link.click() does not work on the latest firefox
    link.dispatchEvent(
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        view: window
      })
    );

    // Remove link from body
    document.body.removeChild(link);
  }

  Comparar(){
    this.comparar.emit(this.Image);
  }

}
