import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AnuncioDetailsPage } from './anuncio-details';

@NgModule({
  declarations: [
    AnuncioDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(AnuncioDetailsPage),
  ],
})
export class AnuncioDetailsPageModule {}
