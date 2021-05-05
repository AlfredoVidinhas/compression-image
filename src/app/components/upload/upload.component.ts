import { DOCUMENT } from '@angular/common';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import Compressor from 'compressorjs';
import { Preview } from 'src/app/model/preview.model';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  qualidades = [0.1, 0.2, 0.5, 0.7, 0.8, 0.9];
  fileUploaded: any;
  isFileSelecionado = false;
  isLoading = false;
  @Output() listaFiles = new EventEmitter<any>();

  constructor(private sanitizer: DomSanitizer, @Inject(DOCUMENT) private document) { }

  ngOnInit(): void {
  }

  /**
   * on file drop handler
   */
   onFileDropped($event) {
    this.ValidarFile($event);
  }

  /**
   * handle file from browsing
   */
  fileBrowseHandler(files) {
    this.ValidarFile(files[0]);
  }

  ValidarFile(file: any){
    this.fileUploaded = file;
    this.isFileSelecionado = true;
    console.log('file: ', this.fileUploaded);
  }

  Cancelar(){
    this.isFileSelecionado = false;
    this.fileUploaded = undefined;
    this.listaFiles.emit(null);
  }

  CriarPreview(){
    this.isLoading = true;
    const compressPromises: Promise<Preview>[] = [];

    for(let i = 0; i < 6; i++){
      compressPromises.push(this.compressImage(this.fileUploaded, this.qualidades[i]));
    }

    // wait until these properties are resolved and loop through the result
    Promise.all(compressPromises).then((compressedFiles) => {
      this.listaFiles.emit({original: this.fileUploaded, previews: compressedFiles});
      this.isLoading = false;
      this.ScrollDown();
    }).catch((error) => console.log('ooops :(', error))
  }

  compressImage(file: File, qualidade): Promise<Preview> {
    const _result = this;
    return new Promise<Preview>((resolve, reject) => {
        new Compressor(this.fileUploaded, {
            quality: qualidade,
            success: (result) => {
              const url = URL.createObjectURL(result);
              const Safeurl = _result.sanitizer.bypassSecurityTrustUrl(url);
              const tam = _result.formatBytes(result.size)
              resolve(new Preview(Safeurl, tam, qualidade, _result.fileUploaded.name, url))//([result], file.name, {type: result.type}))
            },
            error: (error: Error) => reject(error)
        })
    });
  }

  ScrollDown(){
    const element = document.getElementById('lista');
    console.log(element);
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }

  /**
   * format bytes
   * @param bytes (File size in bytes)
   * @param decimals (Decimals point)
   */
  formatBytes(bytes, decimals?) {
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

}
