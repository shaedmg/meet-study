import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { UsuariosI } from '../app/models/usuarios.interface';
import { map } from 'rxjs/operators';

/*
  Generated class for the UsuariosProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UsuariosProvider {
  private usuariosCollection: AngularFirestoreCollection<UsuariosI>;
  private todos: Observable<UsuariosI[]>;

  constructor(public http: HttpClient, db:AngularFirestore) {
    this.usuariosCollection = db.collection<UsuariosI>('Usuarios');
    this.todos = this.usuariosCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      }));
  }


  getUsuarios(){
    return this.todos;
  }
  getUsuario(id: string){
    return this.usuariosCollection.doc<UsuariosI>(id).valueChanges();
  }
  updateUsuario(usuario: UsuariosI, id: string){
   return this.usuariosCollection.doc(id).update(usuario);
  }
  addUsuario(usuario: UsuariosI){
    return this.usuariosCollection.add(usuario);
  }
  removeUsuario(id: string){
    return this.usuariosCollection.doc(id).delete();
  }

}
