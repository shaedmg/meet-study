import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MisAnunciosPage } from './mis-anuncios';
import { GestionAnuncioPage } from '../gestion-anuncio/gestion-anuncio';

@NgModule({
  declarations: [
    MisAnunciosPage,
  ],
  imports: [
    IonicPageModule.forChild(MisAnunciosPage),
    
  ],
})
export class MisAnunciosPageModule {}
