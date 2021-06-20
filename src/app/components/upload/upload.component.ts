import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import Compressor from 'compressorjs';
import { WebcamImage } from 'ngx-webcam';
import { Preview } from 'src/app/model/preview.model';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  allImages: Array<string> = ['png', 'jpg', 'jpeg', 'gif', 'tiff', 'bpg'];
  qualidades = [0.1, 0.2, 0.5, 0.7, 0.8, 0.9];
  fileUploaded: any;
  fileCamera: any;
  isFileSelecionado = false;
  isLoading = false;
  @Output() listaFiles = new EventEmitter<any>();
  webcamImage: WebcamImage = null;
  showCamera = false;
  showPainelPrincipal = true;
  isPNG = false;
  pngConvertedToJpg: any;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
  }

  Cancelar(){
    this.showPainelPrincipal = true;
    this.isFileSelecionado = false;
    this.isPNG =  false;
    this.webcamImage = null;
    this.listaFiles.emit(null);
  }

  /**
   * on file drop handler
   */
   onFileDropped($event) {
     console.log($event.type)
    //if (this.allImages.indexOf($event.type) !== -1) {
      this.ValidarFile($event);
    //}
  }

  /**
   * handle file from browsing
   */
  fileBrowseHandler(files) {
    this.ValidarFile(files[0]);
  }

  ValidarFile(file: any){
    this.fileUploaded = file;
    this.showPainelPrincipal = false;
    if(file.type == 'image/png'){
      this.isPNG = true;
      this.ConvertPngToJpg(file);
    }
    else{
      this.isFileSelecionado = true;
    }
    console.log('file: ', this.fileUploaded);
  }

  CancelarFile(){
    this.Cancelar();
    this.fileUploaded = undefined;
  }

  CriarPreview(imageToCompress){
    this.isLoading = true;
    const compressPromises: Promise<Preview>[] = [];

    for(let i = 0; i < 6; i++){
      compressPromises.push(this.compressImage(imageToCompress, this.qualidades[i]));
    }

    // wait until these properties are resolved and loop through the result
    Promise.all(compressPromises).then((compressedFiles) => {
      this.listaFiles.emit({original: imageToCompress, previews: compressedFiles});
      this.isLoading = false;
    }).catch((error) => console.log('ooops :(', error))
  }

  compressImage(file, qualidade): Promise<Preview> {
    const _result = this;
    return new Promise<Preview>((resolve, reject) => {
        new Compressor(file, {
            quality: qualidade,
            success: (result) => {
              const url = URL.createObjectURL(result);
              const Safeurl = _result.sanitizer.bypassSecurityTrustUrl(url);
              const tam = _result.formatBytes(result.size)
              if(file.size > result.size){
                resolve(new Preview(Safeurl, tam, qualidade, file.name, url))//([result], file.name, {type: result.type}))
              }
              else{
                resolve(null);
              }
            },
            error: (error: Error) => reject(error)
        })
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

  // get image from camera
  handleImage(webcamImage: WebcamImage) {
    this.showCamera = false;
    this.showPainelPrincipal = false;
    this.webcamImage = webcamImage;
    this.fileCamera = this.dataURLtoFile(this.webcamImage.imageAsDataUrl);
  }

  //Open camera to take a picture
  openCamera(){
    this.showCamera = true;
  }

  // Escolher origem
  CompressByOrigem(){
    if(this.isFileSelecionado || this.isPNG){
      this.CriarPreview(this.fileUploaded)
    }
    else if(this.webcamImage){
      this.CriarPreview(this.fileCamera);
    }
  }

  // converter de Base64 para Blob
  dataURLtoFile(dataurl, filename = 'image.jpg') {
    const arr = dataurl.split(',')
    const mime = arr[0].match(/:(.*?);/)[1]
    const bstr = atob(arr[1])
    let n = bstr.length
    const u8arr = new Uint8Array(n)

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n)
    }

    return new File([u8arr], filename, { type: mime })
  }

  // Convert format PNG to JPG
  ConvertPngToJpg(file: File){
    let fr = new FileReader;
    let self = this;
    fr.onload = function() {
        let img = new Image;

        img.onload = function() {
            let canvas = document.createElement('canvas');

            canvas.width = img.width;
            canvas.height = img.height;

            canvas.getContext("2d").drawImage(img, 0, 0);
            let jpeg = canvas.toDataURL("image/jpeg");
            self.pngConvertedToJpg = {image: jpeg, file: self.dataURLtoFile(jpeg)};
            console.log('jpeg: ', self.pngConvertedToJpg);
        };

        img.src = fr.result.toString();
    };

    fr.readAsDataURL(file);
  }

  DownloadBlob() {

    // Create a link element
    const link = document.createElement("a");

    // Set link's href to point to the Blob URL
    link.href = window.URL.createObjectURL(this.pngConvertedToJpg.file);
    link.download = this.pngConvertedToJpg.file.name;

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

}
