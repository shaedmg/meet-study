import { Component, OnInit, ViewChild } from '@angular/core';
import { IonicPage, AlertController } from 'ionic-angular';
import { MeetingI } from '../../app/models/meeting.interface';
import { AnuncioProvider } from '../../providers/anuncio'
import { SubjectsProvider } from '../../providers/subjects'
import { PeticionI } from '../../app/models/peticiones.interface';
import { IonicSelectableComponent } from 'ionic-selectable';
import { SubjectsI } from '../../app/models/subjects.interface';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  @ViewChild('selectComponent') selectComponent: IonicSelectableComponent;
  subject: SubjectsI;
  subjects: SubjectsI[] = [];
  anuncios: MeetingI[] = [];
  anunciosLoaded: MeetingI[] = [];

  searchTermName = "";
  searchTermAcronimo = "";
  constructor( public alertController: AlertController, private anuncioService: AnuncioProvider, private subjectService: SubjectsProvider) { }

  ionViewCanLeave() {
  }

  ngOnInit() {
    this.anuncioService.getAnunciosPromise().then(res => {
      this.anuncios = res;
      this.anunciosLoaded = this.anuncios;
    });
    this.subjectService.getSubjectsPromise().then(res => {
      this.subjects = res;
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
  sendPetition(anuncio) {
    const peticion: PeticionI = {
      name: "",
      time: "",
      userId: ""
    }
    this.anuncioService.addPeticion(anuncio, peticion, anuncio.id)
    this.presentAlert();
  }

  initializeItems() {
    this.anuncios = this.anunciosLoaded;
  }
  subjectChanged(event: { component: IonicSelectableComponent, value: any }) {
    if (event.value) {
      this.searchTermName = event.value.nombre;
      this.searchTermAcronimo = event.value.acronimo;
      this.initializeItems();
      if (!event.value.nombre) {
        return;
      }
      this.anuncios = this.anuncioService.filterAdvertisementByPrimarySubject(this.anuncios, this.searchTermName, this.searchTermAcronimo);
    }
  }

  onClear() {
    this.initializeItems();
  }

  filterSearch(event: {
    component: IonicSelectableComponent,
    text: string
  }) {
    let text = event.text.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
    event.component.startSearch();
    event.component.items = this.filterSearchBySubject(text, this.subjects);
    event.component.endSearch();
  }

  filterSearchBySubject(text, advertisements) {
    return advertisements.filter(subject => {
      return subject.nombre.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").indexOf(text) !== -1 ||
        subject.acronimo.toLowerCase().indexOf(text) !== -1
    });;
  }
}
