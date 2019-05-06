import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MeetingI } from '../../app/models/meeting.interface';
import { AnuncioProvider } from '../../providers/anuncio';
import { UsuariosProvider } from '../../providers/usuarios';
import { MisAnunciosPage } from '../mis-anuncios/mis-anuncios';
import {SubjectsI} from "../../app/models/subjects.interface";
import {SubjectsProvider} from "../../providers/subjects";
import {IonicSelectableComponent} from "ionic-selectable";


@IonicPage()
@Component({
  selector: 'page-add-anuncio',
  templateUrl: 'add-anuncio.html',
})
export class AddAnuncioPage {
  subject: SubjectsI;
  subject2: SubjectsI;
  subjects: SubjectsI[] = [];
  anuncio: MeetingI = {
    name: "",
    primarySubject: "",
    secondarySubject: "",
    time: "",
    peticiones: []
  };

  constructor(
    public usuariosProvider: UsuariosProvider,
    public anuncioServer: AnuncioProvider,
    public navCtrl: NavController,
    public navParams: NavParams,
    private subjectService: SubjectsProvider
  ) { }
  ngOnInit() {

    this.subjectService.getSubjectsPromise().then(res => {
      this.subjects = res;
    });


  }
  subjectChanged(event: { component: IonicSelectableComponent, value: any }) {

    this.anuncio.primarySubject = event.value.nombre;
  }
  subject2Changed(event: { component: IonicSelectableComponent, value: any }) {
    this.anuncio.secondarySubject = event.value.nombre;
  }
  addAnuncios() {
    this.anuncioServer.addAnuncio(this.anuncio);   
    this.navCtrl.setRoot(MisAnunciosPage);
  }
}
