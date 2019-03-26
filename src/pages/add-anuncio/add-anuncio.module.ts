import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddAnuncioPage } from './add-anuncio';

@NgModule({
  declarations: [
    AddAnuncioPage,
  ],
  imports: [
    IonicPageModule.forChild(AddAnuncioPage),
  ],
})
export class AddAnuncioPageModule {}
