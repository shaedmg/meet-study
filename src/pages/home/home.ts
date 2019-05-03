import { Component, OnInit, ViewChild } from '@angular/core';
import { IonicPage, AlertController } from 'ionic-angular';
import { MeetingI } from '../../app/models/meeting.interface';
import { AnuncioProvider } from '../../providers/anuncio'
import { SubjectsProvider } from '../../providers/subjects'
import { Subscription } from 'rxjs/Subscription';
import { PeticionI } from '../../app/models/peticiones.interface';
import { IonicSelectableComponent  } from 'ionic-selectable';
import { SubjectsI } from '../../app/models/subjects.interface';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  @ViewChild('myselect') selectComponent: IonicSelectableComponent ;
  subject: SubjectsI;
  subjects: SubjectsI[];
  anuncios: MeetingI[];
  anunciosLoaded: MeetingI[];
  observer: Subscription;
  observerSubject : Subscription;
  searchTermName = "";
  searchTermAcronimo = "";
  constructor(public alertController: AlertController, private anuncioService: AnuncioProvider, private subjectService: SubjectsProvider) { }

  ionViewCanLeave() {
    this.observer.unsubscribe();
    this.observerSubject.unsubscribe();
  }

  ngOnInit() {
    this.observer = this.anuncioService.getAnuncios().subscribe(res => {
      if (!this.searchTermName) {
        this.anuncios = res;
        this.anunciosLoaded = this.anuncios;
      }
    });
    this.observerSubject = this.subjectService.getSubjects().subscribe(res => {
      if (!this.searchTermName) {
        this.subjects = res;
      }
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
  subjectChanged(event: { component: IonicSelectableComponent , value: any }) {
    if(event.value){
    this.searchTermName = event.value.nombre;
    this.searchTermAcronimo = event.value.acronimo;
    this.initializeItems();
    if(!event.value.nombre){
      return;
    }
    this.anuncios = this.anuncios.filter(res => {
      if (res.primarySubject.toLowerCase().indexOf(this.searchTermName.toLowerCase()) > -1 ||
        res.primarySubject.toLowerCase().indexOf(this.searchTermAcronimo.toLowerCase()) > -1) {
        return true;
      }
      return false;
    });
  }
  }
  onClear() {
    this.initializeItems();
  }
  filterAdvertisement(event: {
    component: IonicSelectableComponent ,
    text: string
  }) {
    let text = event.text.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
    event.component.startSearch();

    event.component.items = this.subjects.filter(subject => {
      return subject.nombre.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").indexOf(text) !== -1 ||
      subject.acronimo.toLowerCase().indexOf(text) !== -1 
    });;
    event.component.endSearch();
  }
  openFromCode() {
    this.selectComponent.open();
  }
  onClose(event) {
    this.searchTermName = "";
    this.searchTermAcronimo = "";
  }
}
