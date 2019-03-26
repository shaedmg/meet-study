import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MisAnunciosPage } from './mis-anuncios';

@NgModule({
  declarations: [
    MisAnunciosPage,
  ],
  imports: [
    IonicPageModule.forChild(MisAnunciosPage),
  ],
})
export class MisAnunciosPageModule {}
