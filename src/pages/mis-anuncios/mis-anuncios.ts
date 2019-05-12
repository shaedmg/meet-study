import { AddAnuncioPage } from './../add-anuncio/add-anuncio';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { MeetingI } from '../../app/models/meeting.interface';
import { AnuncioProvider } from '../../providers/anuncio'
import { GestionAnuncioPage } from '../gestion-anuncio/gestion-anuncio';
import { Subscription } from 'rxjs/Subscription';
import { AnuncioDetailsPage } from '../anuncio-details/anuncio-details';
import * as firebase from 'firebase/app';

@IonicPage()
@Component({
  selector: 'page-mis-anuncios',
  templateUrl: 'mis-anuncios.html',
})
export class MisAnunciosPage implements OnInit {
  anuncios: MeetingI[];
  observer: Subscription;
  anuncioId = "";
  
  constructor(
    private anuncioService: AnuncioProvider,
    public alertController: AlertController, 
    public navCtrl: NavController, 
    public navParams: NavParams) {
      
  }

 
  ngOnInit() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.observer = this.anuncioService.getAnunciosByUser(user.uid)
        .subscribe(res => {
          this.anuncios = res;
        });
      }
    });
  }

  async confirmarEliminacion(id){
    const alert = await this.alertController.create({
      title: 'ELIMINAR ANUNCIO',
      message: '¿Está seguro de que desea eliminar el anuncio? Esta acción no puede revertirse.',
      buttons: [
        {
          text: "Eliminar",
          handler: () => {
            this.removeAnuncios(id);
          }

        },
        {
          text: "Cancelar",
          role: "cancel"
        }
      ]
    });

    await alert.present();
  }

  openAdvertisementDetails(anuncio){
    this.navCtrl.push(AnuncioDetailsPage,anuncio)
  }
  nuevoAnuncio(){
    this.navCtrl.push(AddAnuncioPage);
  }
  removeAnuncios(ident){
    this.anuncioService.removeAnuncio(ident);
  }
  modificarAnuncio(ident){
    this.navCtrl.push(GestionAnuncioPage,{id: ident});
  }
}
