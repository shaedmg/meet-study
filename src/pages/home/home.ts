import { Component, OnInit, ViewChild } from '@angular/core';
import { IonicPage, AlertController, ModalController, DateTime } from 'ionic-angular';
import { MeetingI } from '../../app/models/meeting.interface';
import { AnuncioProvider } from '../../providers/anuncio'
import { SubjectsProvider } from '../../providers/subjects'
import { UsuariosProvider } from '../../providers/usuarios'
import { Favorite, UsuariosI } from '../../app/models/usuarios.interface'
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
  subject;
  subjects: SubjectsI[] = [];
  valoracion;

  anuncios: MeetingI[] = [];
  anunciosLoaded: MeetingI[] = [];
  searchTermName = "";
  searchTermAcronimo = "";
  constructor(private modalCtrl: ModalController,
    public alertController: AlertController,
    private anuncioService: AnuncioProvider,
    private userService: UsuariosProvider,
    private subjectService: SubjectsProvider) { }

  async ngOnInit() {
    this.loadAdvertisements();
    this.loadSubjects();
  }
  loadAdvertisements() {
    this.anuncioService.getAnunciosPromise().then(res => {
      this.anuncios = res.map(anun => {
        this.getAdvertisementValoration(anun).then(value => {
          anun.valoration = value;
        });
        return anun;
      });;
    })
  }
  loadSubjects() {
    this.subjectService.getSubjectsPromise().then(res => {
      this.subjects = res;
    })
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      title: 'Peticion',
      message: 'Se ha enviado correctamente su peticion.',
      buttons: ['Ok']
    });

    await alert.present();
  }
   filterAdvertisements(){
   this.loadSubjects();
   if(!this.subject && !this.valoracion)this.loadAdvertisements();
    if(this.subject){
      this.anuncioService.filterAdvertisementByPrimarySubject(this.subject.nombre, this.subject.acronimo).then(res => {
        this.anuncios = res.map(anun => {
          this.getAdvertisementValoration(anun).then(value => {
            anun.valoration = value;
          });
          return anun;
        });
      })
      
    }
    if(this.valoracion){
      this.userService.getUsersWithValoration(this.valoracion).then(res => {
        this.anuncios = this.anuncioService.getAdvertisementsOfUsers(this.anuncios, res);
      });
    }
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

  addFavorite(anuncio) {
    const favorite: Favorite = {
      favoriteId: anuncio.id
    }
    this.userService.addNewFavorite(favorite)
  }
  onClear() {
   this.loadAdvertisements();
  }
  getAdvertisementValoration(anuncio) {
    return this.userService.getUserById(anuncio.userId).then(res => {
      if (res.generalValoration) return res.generalValoration.toString()
      else return "Sin valoracion"
    });
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
