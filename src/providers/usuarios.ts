import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { UsuariosI } from '../app/models/usuarios.interface';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class UsuariosProvider {

  private userProfileCollection: AngularFirestoreCollection<UsuariosI>;
  private allUsers: Observable<UsuariosI[]>;
  private userProfile;

  constructor(
    public http: HttpClient,
    db: AngularFirestore,
    private afAuth: AngularFireAuth) {
    this.userProfileCollection = db.collection<UsuariosI>('userProfile');
  }

  getUsuarios() {
    this.allUsers = this.userProfileCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      }));
    return this.allUsers;
  }

  getActualUserUID(): string {
    if (this.afAuth.auth.currentUser) {
      return this.afAuth.auth.currentUser.uid;
    } else {
      return ""
    }
  }

  getActualUser() {
    return this.userProfileCollection.doc<UsuariosI>(this.getActualUserUID()).valueChanges();
  }

  getUsuario() {
    this.userProfile = this.userProfileCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        }).filter(res => res.id == this.getActualUserUID());
      }));
    return this.userProfile;
  }
/*
  getUserInfo(): any {
    var userInfo = { id: "", name: "", avatar: "" };
    //obtener la info del usuario logueado
    var actualUser =firebase.auth().currentUser;
    var userInfop = this.afs.doc(`userProfile/${actualUser.uid}`);
    var result = userInfop.get();
        userInfo.id = actualUser.uid;
        userInfo.name = userInfop.collection.name;
        userInfo.avatar = './assets/user.jpg';

    console.log("--------------------");
    console.log(this.UP.getUserInfo());
    console.log("--------------------");
  }
*/
  updateUsuario(usuario: UsuariosI) {
    return this.userProfileCollection.doc(usuario.id).update(usuario);
  }
  addUsuario(usuario: UsuariosI) {
    return this.userProfileCollection.add(usuario);
  }
  removeUsuario(id: string) {
    return this.userProfileCollection.doc(id).delete();
  }
}
