import { Component, OnInit } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import {MeetingI} from  '../../app/models/meeting.interface';
import {AnuncioProvider} from '../../providers/anuncio'

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{
  anuncios: MeetingI[];
  constructor(private anuncioService:AnuncioProvider){}

  ngOnInit(){
    this.anuncioService.getAnuncios().subscribe(res =>{
      this.anuncios = res;
    });

  }
}
