import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MeetingI } from '../../app/models/meeting.interface';
import {AnuncioProvider} from '../../providers/anuncio';
import { Subscription  } from 'rxjs/Subscription';

@IonicPage()
@Component({
  selector: 'page-gestion-anuncio',
  templateUrl: 'gestion-anuncio.html',
})
export class GestionAnuncioPage implements OnInit{
  
  anuncio: MeetingI = {
    name: "",
    primarySubject: "",
    secondarySubject: "",
    time: "",
    peticiones: []
  };
  anuncioId = "";
  observer: Subscription ;
  constructor(public navCtrl: NavController,private anuncioService: AnuncioProvider, public navParams: NavParams) {
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

  updateAnuncios(){
    this.navCtrl.pop();
    this.anuncioService.updateAnuncio(this.anuncio,this.anuncioId);   
  }
}
