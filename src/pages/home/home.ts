import { Component, OnInit } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import {MeetingI} from  '../../app/models/meeting.interface';
import {AnuncioProvider} from '../../providers/anuncio'
import { NavController } from 'ionic-angular';
import {AnuncioDetailsPage} from '../anuncio-details/anuncio-details';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{
  anuncios: MeetingI[];
  constructor(private anuncioService:AnuncioProvider, private navCtrl: NavController){}

  ngOnInit(){
    this.anuncioService.getAnuncios().subscribe(res =>{
      this.anuncios = res;
    });
  }

  ionViewWillEnter(){
    this.anuncioService.getAnuncios().subscribe(res =>{
      this.anuncios = res;
    });
  }
  abrirAnuncioDetails(ident) {
    this.navCtrl.push(AnuncioDetailsPage,{id: ident});
  }
}
