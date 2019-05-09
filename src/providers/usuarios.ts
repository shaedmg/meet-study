import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { UsuariosI, Favorite } from '../app/models/usuarios.interface';
import { map, take } from 'rxjs/operators';
import { AngularFireAuth } from 'angularfire2/auth';
import { UserInfo } from '../app/models/chat.model';

@Injectable()
export class UsuariosProvider {


  private userProfileCollection: AngularFirestoreCollection<UsuariosI>;
  private allUsers: Observable<UsuariosI[]>;
  private favorites: Observable<Favorite[]>;
  userProvider: any;
  anunciosCollection: any;
  afs: any;

  constructor(
    public http: HttpClient,
    db: AngularFirestore,
    private afAuth: AngularFireAuth) {
    this.userProfileCollection = db.collection<UsuariosI>('userProfile');
  }

  getCurrentUserUID(): string {
    if (this.afAuth.auth.currentUser) {
      return this.afAuth.auth.currentUser.uid;
    } else {
      return ""
    }
  }

  getCurrentUser() {
    return this.userProfileCollection.doc<UsuariosI>(this.getCurrentUserUID()).valueChanges();
  }

  getUserById(id: string) {
    return this.userProfileCollection.doc<UsuariosI>(id).valueChanges();
  }

  getGeneralValorationPromise(id: string): Promise<number> {
    let val;
    let promise = this.getUserById(id);
    promise.subscribe((user) => {
      val = user.generalValoration;
    });
    return new Promise(resolve => resolve(val));
  }

  getCurrentUserPromise(): Promise<UsuariosI> {
    let useri;
    let promise = this.getCurrentUser();
    promise.subscribe((user) => {
      useri = user
    });
    return new Promise(resolve => resolve(useri));
  }

  getCurrentUserPromiseToChat(): Promise<UserInfo> {
    let useri = new UserInfo();
    let promise = this.getCurrentUser();
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

  addNewFavorite(favorite: Favorite) {
    this.getCurrentUser().pipe(take(1)).toPromise()
      .then(usuario => {
        if (usuario.favorites) {
          usuario.favorites.push(favorite)
          this.userProfileCollection.doc<UsuariosI>(usuario.id).update(usuario)
        } else {
          console.log("hola");
          const arr: Favorite[] = [];
          arr.push(favorite);
          usuario.favorites = arr
          console.log(usuario.id + "")
          this.userProfileCollection.doc<UsuariosI>(usuario.id).update(usuario)
        }

        //return this.favoritesCollection.add(favorite);
      })


  }
}
