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
<<<<<<< HEAD
  private userProfile;
=======
>>>>>>> 6bbb96102cc4a31c1130e9dae7b07cf887c659ac

  constructor(
    public http: HttpClient,
    db: AngularFirestore,
    private afAuth: AngularFireAuth) {
    this.userProfileCollection = db.collection<UsuariosI>('userProfile');
  }

<<<<<<< HEAD
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

=======
>>>>>>> 6bbb96102cc4a31c1130e9dae7b07cf887c659ac
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

<<<<<<< HEAD
  getUsuario(uid) {
    this.userProfile = this.userProfileCollection.snapshotChanges().pipe(
=======
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
>>>>>>> 6bbb96102cc4a31c1130e9dae7b07cf887c659ac
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      }));
<<<<<<< HEAD
    return this.userProfile;
=======
    return new Promise(resolve => resolve(this.allUsers));
>>>>>>> 6bbb96102cc4a31c1130e9dae7b07cf887c659ac
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
