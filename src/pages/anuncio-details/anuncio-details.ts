import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import {MeetingI} from '../../app/models/meeting.interface';
import {AnuncioProvider} from '../../providers/anuncio';
import { PeticionI } from '../../app/models/peticiones.interface';
import { UsuariosProvider } from '../../providers/usuarios';
import { ChatService } from '../../providers/chat-service';

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
    peticiones: []
  };
  anuncioId = "";
  constructor(private chatService: ChatService,public alertController: AlertController, private usuarioProvider: UsuariosProvider,public navCtrl: NavController,private anuncioService: AnuncioProvider, public navParams: NavParams) {
    this.anuncioId = this.navParams.get('id') ;
  }

  ionViewCanEnter() {
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
      title: 'Peticion',
      message: 'Se ha enviado correctamente su peticion.',
      buttons: ['Ok']
    });

    await alert.present();
  }
  sendPetition(){
      const peticion: PeticionI = { 
      name: "",
      time: "",
      userId: ""
    }
    this.anuncioService.addPeticion(this.anuncio,peticion,this.anuncioId)
    this.navCtrl.pop();
    this.presentAlert();
  }
  
  goHome(){
    this.navCtrl.pop();
  }
  acceptPetition(peticion){
    this.chatService.addChat(peticion.userId);
  }
}


