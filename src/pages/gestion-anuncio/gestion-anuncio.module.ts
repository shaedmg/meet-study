import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GestionAnuncioPage } from './gestion-anuncio';

@NgModule({
  declarations: [
    GestionAnuncioPage,
  ],
  imports: [
    IonicPageModule.forChild(GestionAnuncioPage),
  ],
})
export class GestionAnuncioPageModule {}
