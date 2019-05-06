import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddAnuncioPage } from './add-anuncio';
import {IonicSelectableModule} from "ionic-selectable";

@NgModule({
  declarations: [
    AddAnuncioPage,
  ],
  imports: [
    IonicPageModule.forChild(AddAnuncioPage),
    IonicSelectableModule,
  ],
})
export class AddAnuncioPageModule {}
