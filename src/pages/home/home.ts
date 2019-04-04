import { Component, OnInit} from '@angular/core';
import { IonicPage, AlertController } from 'ionic-angular';
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
  constructor(public alertController: AlertController,private anuncioService:AnuncioProvider, private navCtrl: NavController){}

  ionViewCanLeave(){
      this.observer.unsubscribe();
  }
  ngOnInit(){
    this.observer = this.anuncioService.getAnuncios().subscribe(res =>{
      this.anuncios = res;
    });
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      title: 'Alert',
      message:"Su solicitud ha sido enviada.",
      buttons: ['Aceptar']
    });
    await alert.present();
  }

  abrirAnuncioDetails(ident) {
    this.navCtrl.push(AnuncioDetailsPage,{id: ident});
  }
}
