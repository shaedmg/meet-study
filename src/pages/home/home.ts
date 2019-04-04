import { Component, OnInit} from '@angular/core';
import { IonicPage, AlertController } from 'ionic-angular';
import {MeetingI} from  '../../app/models/meeting.interface';
import {AnuncioProvider} from '../../providers/anuncio'
import { Subscription  } from 'rxjs/Subscription';
import { PeticionI } from '../../app/models/peticiones.interface';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements  OnInit{
  anuncios: MeetingI[];
   observer: Subscription ;
  constructor(public alertController: AlertController,private anuncioService:AnuncioProvider){}

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
      title: 'Peticion',
      message: 'Se ha enviado correctamente su peticion.',
      buttons: ['Ok']
    });

    await alert.present();
  }
  sendPetition(anuncio){
      const peticion: PeticionI = { 
      name: "",
      time: "",
      userId: ""
    }
    this.anuncioService.addPeticion(anuncio,peticion,anuncio.id)
    this.presentAlert();
  }
 /* async presentAlert(number) {
    if(number==1){
      const alert = await this.alertController.create({
        title: 'Alert',
        message:"Su solicitud ha sido enviada.",
        buttons: ['Aceptar']
      });
      await alert.present();
    }else if(number==2){
      const alert = await this.alertController.create({
        title: 'Alert',
        message:"El anuncio deberia desaparecer del inicio pero no de la bd",
        buttons: ['Aceptar']
      });
      await alert.present();
    }
  }*/
}
