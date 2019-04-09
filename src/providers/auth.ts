import { UsuariosI } from '../app/models/usuarios.interface';
import { AngularFirestoreDocument, AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { Injectable, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Nav } from 'ionic-angular';


@Injectable()
export class AuthProvider {
  @ViewChild(Nav) nav: Nav;
  constructor(
    public afireauth: AngularFireAuth, 
    public afs: AngularFirestore,
    public formBuilder: FormBuilder
    ) {

  }

  async registerUser(user): Promise<any> {
    try {
      const credentials: firebase.auth.UserCredential = await this.afireauth.auth
        .createUserWithEmailAndPassword(
          user.email,
          user.password
        );
        //catch el error de createUserWithEmailAndPassword para validar
        

      const userProfileDocument: AngularFirestoreDocument<UsuariosI> = this.afs.doc(`userProfile/${credentials.user.uid}`);

      await userProfileDocument.set({
        id: credentials.user.uid,
        email: user.email,
        name: user.name,
        lastName: user.lastName,
        birthDate: user.birthDate
      });
    } catch (error) {
    }
  }

  async loginUser(Login): Promise<firebase.auth.UserCredential> {
    return this.afireauth.auth.signInWithEmailAndPassword(Login.email, Login.password);
  }

  logout() {
    this.afireauth.auth.signOut().then(() => { })
  }
}