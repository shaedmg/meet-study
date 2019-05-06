import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MeetingI } from '../../app/models/meeting.interface';
import {AnuncioProvider} from '../../providers/anuncio';
import { Subscription  } from 'rxjs/Subscription';
import {SubjectsI} from "../../app/models/subjects.interface";
import {SubjectsProvider} from "../../providers/subjects";
import {IonicSelectableComponent} from "ionic-selectable";

@IonicPage()
@Component({
  selector: 'page-gestion-anuncio',
  templateUrl: 'gestion-anuncio.html',
})
export class GestionAnuncioPage implements OnInit{
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
  anuncioId = "";
  observer: Subscription ;
  constructor(public navCtrl: NavController,private anuncioService: AnuncioProvider, public navParams: NavParams,private subjectService: SubjectsProvider) {
    this.anuncioId = this.navParams.get('id');
  }
  
  ngOnInit() {
    if(this.anuncioId){
      this.loadTodo();
    }
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
  async loadTodo(){
    this.anuncioService.getAnuncio(this.anuncioId).subscribe(res => {
      this.anuncio = res;
    });
  }

  updateAnuncios(){
    this.navCtrl.pop();
    this.anuncioService.updateAnuncio(this.anuncio,this.anuncioId);   
  }
  removeAnuncios(){
    this.navCtrl.pop();
    this.anuncioService.removeAnuncio(this.anuncioId);
    
  }
}
