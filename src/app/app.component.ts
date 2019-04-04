import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthProvider } from '../providers/auth';
import { LoginPage } from '../pages/login/login';
import { UsuariosProvider } from '../providers/usuarios';
import firebase from 'firebase';
import { UsuariosI } from './models/usuarios.interface';
import { take } from 'rxjs/operators';

@Component({
  templateUrl: 'app.html'
})
export class MyApp{
  @ViewChild(Nav) nav: Nav;
  rootPage: any = 'LoginPage';
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

  userProfile: UsuariosI = {
    id: "",
    name: "",
    lastName: "",
    email: "",
    birthDate: null
  }

  cerrarSesion() {
    this.auth.logout();
    this.nav.setRoot(LoginPage)
  }
  readUser(){
    this.userProvider.getCurrentUser().pipe(take(1)).toPromise()
      .then(usuario => {
        this.userProfile = usuario;
      });
  }

  launchPage(page: string) {
    if (firebase.auth().currentUser != null) {
      this.readUser();
      if(page=="EditProfilePage"){
        this.nav.setRoot(page,{userProfile: this.userProfile});
      }else{
        this.nav.setRoot(page);
      }
      
    } else {
      this.nav.setRoot(LoginPage)
    }
  }

  ionViewDidLoad() {
    //Para obtener datos de la DB y personalizar el menu
    this.readUser();
  }
}


