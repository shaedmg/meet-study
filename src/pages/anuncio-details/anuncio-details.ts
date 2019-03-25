import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import {MeetingI} from '../../app/models/meeting.interface';
import {AnuncioProvider} from '../../providers/anuncio'
/**
 * Generated class for the AnuncioDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-anuncio-details',
  templateUrl: 'anuncio-details.html',
})
export class AnuncioDetailsPage {

  anuncio: MeetingI = {
    name: "",
    primarySubject: "",
    secondarySubject: "",
    time: "",


  };
  anuncioId = "";
  constructor(public alertController: AlertController, public navCtrl: NavController,private anuncioService: AnuncioProvider, public navParams: NavParams) {
    this.anuncioId = this.navParams.get('id');
  }

  ngOnInit() {
    if(this.anuncioId){
      this.loadTodo();
    }
  }

  async loadTodo(){
    this.anuncioService.getAnuncio(this.anuncioId).subscribe(res => {
      this.anuncio = res;
    });
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      title: 'Alert',
      message: 'Juana te ha enviado una solicitud para estudiar.',
      buttons: ['Aceptar solicitud','Rechazar solicitud']
    });

    await alert.present();
  }
  sendPetition(){
    this.navCtrl.pop();
    this.presentAlert();
  }
  goHome(){
    this.navCtrl.pop();
  }

}


