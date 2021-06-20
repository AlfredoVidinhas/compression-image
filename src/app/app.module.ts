import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UploadComponent } from './components/upload/upload.component';
import { CardComponent } from './components/card/card.component';
import { DndDirective } from './dnd.directive';
import { ComparisonModule } from './components/image-comparison/image-comparison.module';
import { PercentagemPipe } from './pipes/percentagem.pipe';
import { TakeFotoComponent } from './components/take-foto/take-foto.component';
import { WebcamModule } from 'ngx-webcam';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';

// Note we need a separate function as it's required
// by the AOT compiler.
export function playerFactory() {
  return player;
}

@NgModule({
  declarations: [
    AppComponent,
    UploadComponent,
    CardComponent,
    DndDirective,
    PercentagemPipe,
    TakeFotoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ComparisonModule,
    WebcamModule,
    LottieModule.forRoot({ player: playerFactory })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
