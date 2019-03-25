import { Component, OnInit, OnDestroy} from '@angular/core';
import { IonicPage } from 'ionic-angular';
import {MeetingI} from  '../../app/models/meeting.interface';
import {AnuncioProvider} from '../../providers/anuncio'
import { NavController } from 'ionic-angular';
import {AnuncioDetailsPage} from '../anuncio-details/anuncio-details';
import { Subscription  } from 'rxjs/Subscription';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements  OnInit{
  anuncios: MeetingI[];
   observer: Subscription ;
  constructor(private anuncioService:AnuncioProvider, private navCtrl: NavController){}

  ionViewCanLeave(){
      this.observer.unsubscribe();
  }
  ngOnInit(){
    this.observer = this.anuncioService.getAnuncios().subscribe(res =>{
      this.anuncios = res;
    });
  }

  abrirAnuncioDetails(ident) {
    this.navCtrl.push(AnuncioDetailsPage,{id: ident});
  }
}
