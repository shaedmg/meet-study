import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { UsuariosI } from '../app/models/usuarios.interface';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from 'angularfire2/auth';
import { UserInfo } from '../app/models/chat.model';

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

  getUserLoged():Promise<UsuariosI>{
    let useri;
    let promise = this.getActualUser();
    promise.subscribe((user) => {
      useri = user
    });
    return new Promise(resolve => resolve(useri));
  }

  getUserLogedToChat(): Promise<UserInfo> {
    let useri = new UserInfo();
    let promise = this.getActualUser();
    promise.subscribe((user) => {
      useri.id = user.id;
      useri.name = user.name;
      useri.avatar = "./assets/user.jpg";
    });
    
    return new Promise(resolve => resolve(useri));
  }

  getAllUsersToChat(): Promise<any> {
    this.allUsers = this.userProfileCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      }));
    return new Promise(resolve => resolve(this.allUsers));
  }

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
