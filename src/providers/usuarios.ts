import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { UsuariosI } from '../app/models/usuarios.interface';
import { map } from 'rxjs/operators';
import firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth'


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

  getlogedUser() {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.user.subscribe(currentUser => {
        if(currentUser){
          this.userProfile = currentUser;
          resolve(this.userProfile);
        }
      })
    });
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
      console.log("casi");
      return ""
    }
  }

  getActualUser() {
    return this.userProfileCollection.doc<UsuariosI>(this.getActualUserUID()).valueChanges();
  }

  getUsuario(uid) {
    this.userProfile = this.userProfileCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        }).filter(res => res.id == uid);
      }));
    return this.userProfile;
  }

  updateUsuario(usuario: UsuariosI, id: string) {
    return this.userProfileCollection.doc(id).update(usuario);
  }
  addUsuario(usuario: UsuariosI) {
    return this.userProfileCollection.add(usuario);
  }
  removeUsuario(id: string) {
    return this.userProfileCollection.doc(id).delete();
  }

}
