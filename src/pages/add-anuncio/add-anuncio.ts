import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {MeetingI} from '../../app/models/meeting.interface';
import {AnuncioProvider} from '../../providers/anuncio'
/**
 * Generated class for the AddAnuncioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-anuncio',
  templateUrl: 'add-anuncio.html',
})
export class AddAnuncioPage {

  anuncio: MeetingI = {
    name: "Santi",
    primarySubject: "",
    secondarySubject: "",
    time: "",
  };

  constructor(public anuncioServer: AnuncioProvider,public navCtrl: NavController, public navParams: NavParams) {
  }

  addAnuncio(){
    this.anuncio.userId = "g52EVBGdqhtiC75Jc0B0";
    this.anuncioServer.addAnuncio(this.anuncio);
  }

}
