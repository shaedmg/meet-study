import { UsuariosI } from './models/usuarios.interface';

import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ListChatPage } from '../pages/list-chat/list-chat';
import { SignUpPage } from '../pages/signup/signup';
import { HomePage } from '../pages/home/home';
import { MisAnunciosPage } from '../pages/mis-anuncios/mis-anuncios';
import { AddAnuncioPage } from '../pages/add-anuncio/add-anuncio';
import { AuthProvider } from '../providers/auth';
import { LoginPage } from '../pages/login/login';
import { UsuariosProvider } from '../providers/usuarios';
import firebase from 'firebase';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = 'LoginPage';

  //Para obtener datos de la DB y personalizar el menu
  usuario: UsuariosI = {
    name: "",
    lastName: "",
    email: "",
    birthDate: null,
  };

  constructor(
    platform: Platform,
    private auth: AuthProvider,
    public userProvider: UsuariosProvider,
    statusBar: StatusBar,
    splashScreen: SplashScreen) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
  openPage(page) {
    this.nav.setRoot(page.component);
  }

  cerrarSesion() {
    this.auth.logout();
    this.nav.setRoot(LoginPage)
  }

  launchPage(page: String) {

    if (firebase.auth().currentUser != null) {
      this.usuario;
      console.log(this.userProvider.getUsuario(firebase.auth().currentUser.uid));

    }
    if (page == 'ListChatPage') this.nav.setRoot(ListChatPage);
    if (page == 'HomePage') this.nav.setRoot(HomePage);
    if (page == 'Register') this.nav.setRoot(SignUpPage);
    if (page == 'AddAnuncioPage') this.nav.setRoot(AddAnuncioPage);
    if (page == 'MisAnunciosPage') this.nav.setRoot(MisAnunciosPage);
  }
  
  ionViewCanEnter(){

  }
}


