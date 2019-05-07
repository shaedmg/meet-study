import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AnunciosFavoritosPage } from './anuncios-favoritos';

@NgModule({
  declarations: [
    AnunciosFavoritosPage,
  ],
  imports: [
    IonicPageModule.forChild(AnunciosFavoritosPage),
  ],
})
export class AnunciosFavoritosPageModule {}
