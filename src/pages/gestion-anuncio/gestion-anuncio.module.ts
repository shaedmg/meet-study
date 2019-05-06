import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GestionAnuncioPage } from './gestion-anuncio';
import {IonicSelectableModule} from "ionic-selectable";

@NgModule({
  declarations: [
    GestionAnuncioPage,
  ],
  imports: [
    IonicPageModule.forChild(GestionAnuncioPage),
    IonicSelectableModule,
  ],
})
export class GestionAnuncioPageModule {}
