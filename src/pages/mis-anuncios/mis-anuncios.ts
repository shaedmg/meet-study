import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {MeetingI} from  '../../app/models/meeting.interface';
import {AnuncioProvider} from '../../providers/anuncio'
import {GestionAnuncioPage} from '../gestion-anuncio/gestion-anuncio';
import { Subscription  } from 'rxjs/Subscription';
/**
 * Generated class for the MisAnunciosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mis-anuncios',
  templateUrl: 'mis-anuncios.html',
})
export class MisAnunciosPage implements OnInit{
  anuncios: MeetingI[];
   observer: Subscription ;
  constructor(private anuncioService:AnuncioProvider, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewCanLeave(){
    this.observer.unsubscribe();
}
ngOnInit(){
  this.observer = this.anuncioService.getAnunciosByUser().subscribe(res =>{
    this.anuncios = res;
  });
}

abrirAnuncioDetails(ident) {
  this.navCtrl.push(GestionAnuncioPage,{id: ident});
}

}
