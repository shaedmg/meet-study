import { UsuariosI } from './models/usuarios.interface';

import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, NavParams} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ListChatPage } from '../pages/list-chat/list-chat';
import { SignUpPage } from '../pages/signup/signup';
import {LoginPage} from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import {MisAnunciosPage} from '../pages/mis-anuncios/mis-anuncios';
import { AddAnuncioPage } from '../pages/add-anuncio/add-anuncio';
import { AngularFireDatabase } from 'angularfire2/database';
import { AuthProvider } from '../providers/auth';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any = 'LoginPage';

  //Para obtener datos de la DB y personalizar el menu
  usuario: UsuariosI = {
    Nombre:"",
    Apellidos: "",
    email: "",
    contraseña: "",
    fechaNacimiento: null,
  };

  constructor(platform: Platform, private auth: AuthProvider,
    statusBar: StatusBar, splashScreen: SplashScreen) {
    
    platform.ready().then(() => {

      //Si la autenticación es correcta, entra al inicio, si no se mantiene en el login.
      this.auth.Session.subscribe(session=>{
        if(session){
            this.rootPage = 'HomePage';
        }
          else{
            this.rootPage = 'LoginPage';
          }
      });

      
      statusBar.styleDefault();
      splashScreen.hide();
    });
    
  }
  openPage(page) {
    this.nav.setRoot(page.component);
  }

  cerrarSesion(){
      this.auth.logout();
  }

  launchPage(page: String){
    if(page == 'ListChatPage') this.nav.setRoot(ListChatPage);
    if(page == 'HomePage') this.nav.setRoot(HomePage);
    if(page == 'Register') this.nav.setRoot(SignUpPage);    
    if(page == 'AddAnuncioPage') this.nav.setRoot(AddAnuncioPage);
    if(page == 'MisAnunciosPage') this.nav.setRoot(MisAnunciosPage);
    
  }
}


  