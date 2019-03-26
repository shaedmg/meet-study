import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {MeetingI} from '../../app/models/meeting.interface';
import {AnuncioProvider} from '../../providers/anuncio';
import * as firebase from 'firebase/app';
import { UsuariosProvider } from '../../providers/usuarios';


@IonicPage()
@Component({
  selector: 'page-add-anuncio',
  templateUrl: 'add-anuncio.html',
})
export class AddAnuncioPage {

  anuncio: MeetingI = {
    name: "",
    primarySubject: "",
    secondarySubject: "",
    time: "",
  };
  
  constructor(public usuariosProvider: UsuariosProvider,public anuncioServer: AnuncioProvider,public navCtrl: NavController, public navParams: NavParams) {
   
  }

  addAnuncios(){
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.anuncio.userId = user.uid;
        this.usuariosProvider.getUsuario(this.anuncio.userId).subscribe(res => {
          this.anuncio.name = res.Nombre ;
          this.anuncioServer.addAnuncio(this.anuncio);
        });
      }
    });

  }
}
