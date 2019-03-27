import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { UsuariosI } from '../app/models/usuarios.interface';
import { map } from 'rxjs/operators';
import firebase from 'firebase';


@Injectable()
export class UsuariosProvider {
  
  private userProfileCollection: AngularFirestoreCollection<UsuariosI>;
  private todos: Observable<UsuariosI[]>;
  private user;

  constructor(public http: HttpClient, db:AngularFirestore) {
    this.userProfileCollection = db.collection<UsuariosI>('userProfile');
  }

  getlogedUser(): Observable<UsuariosI>{
    return this.getUsuario(firebase.auth().currentUser.uid);
  }

  getUsuarios(){
    this.todos = this.userProfileCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      }));
    return this.todos;
  }

  getUsuario(uid) {
    this.user = this.userProfileCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        }).filter(res => res.id == uid);
      }));
    return this.user;
  }

  updateUsuario(usuario: UsuariosI, id: string){
   return this.userProfileCollection.doc(id).update(usuario);
  }
  addUsuario(usuario: UsuariosI){
    return this.userProfileCollection.add(usuario);
  }
  removeUsuario(id: string){
    return this.userProfileCollection.doc(id).delete();
  }

}
