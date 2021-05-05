import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UploadComponent } from './components/upload/upload.component';
import { CardComponent } from './components/card/card.component';
import { DndDirective } from './dnd.directive';
import { ComparisonModule } from './components/image-comparison/image-comparison.module';
import { PercentagemPipe } from './pipes/percentagem.pipe';

@NgModule({
  declarations: [
    AppComponent,
    UploadComponent,
    CardComponent,
    DndDirective,
    PercentagemPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ComparisonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
