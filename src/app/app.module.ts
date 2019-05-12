import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { BrowserModule } from '@angular/platform-browser';

import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { EmojiProvider } from '../providers/emoji';
import { HttpClientModule } from "@angular/common/http";
import { HttpModule } from '@angular/http';

import { environment } from '../environment/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AnuncioProvider } from '../providers/anuncio';
import { UsuariosProvider } from '../providers/usuarios';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AuthProvider } from '../providers/auth';
import { ChatService } from '../providers/chat-service';
import { SubjectsProvider } from '../providers/subjects';
import { IonicSelectableModule } from 'ionic-selectable';
import { IonicRatingModule } from 'ionic-rating';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    IonicModule.forRoot(MyApp, {
      tabsHideOnSubPages: true,
      tabsLayout: 'icon-left',
      preloadModules: true
    }),
    IonicSelectableModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    IonicRatingModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    EmojiProvider,
    SubjectsProvider,
    AnuncioProvider,
    UsuariosProvider,
    ChatService,
    AuthProvider
  ]
})
export class AppModule {

}
