import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { MeetingI } from '../app/models/meeting.interface';
import { UsuariosProvider } from './usuarios';
import { PeticionI } from '../app/models/peticiones.interface';
import { UsuariosI } from '../app/models/usuarios.interface';

@Injectable()
export class AnuncioProvider {
  private anunciosCollection: AngularFirestoreCollection<MeetingI>;
  private todos: Observable<MeetingI[]>;

  constructor(public http: HttpClient, 
    db: AngularFirestore, 
    private userProvider: UsuariosProvider) {
    this.anunciosCollection = db.collection<MeetingI>('anuncios');
  }

  getInitialAnuncios(){
    const ajam = this.anunciosCollection.get();
    console.log(ajam);
  }
  getAnuncios(): Observable<MeetingI[]> {
    this.todos = this.anunciosCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      }));
    return this.todos;
  }

  getAnunciosPromise(): Promise<MeetingI[]> {
    return this.anunciosCollection.snapshotChanges()
      .pipe(
        take(1),
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        }),
      ).toPromise() ;
  }

  getAnunciosSin(): MeetingI[]{
    let ajam: MeetingI[];
    let count = 0;
    this.anunciosCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          ajam[count++] = a.payload.doc.data();
          const id = a.payload.doc.id;
        });
      }));
    return ajam;
  }
  getAnuncio(id: string) {
    return this.anunciosCollection.doc<MeetingI>(id).valueChanges();
  }

  getAnunciosByUser(userId) {
    this.todos = this.anunciosCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        }).filter(res => res.userId == userId);
      }));
    return this.todos;
  }
  filterAdvertisementByPrimarySubject(searchTermName,searchTermAcronimo){
    return this.getAnunciosPromise().then(advertisements => {return advertisements.filter(res => {
      if (res.primarySubject.toLowerCase().indexOf(searchTermName.toLowerCase()) > -1 ||
        res.primarySubject.toLowerCase().indexOf(searchTermAcronimo.toLowerCase()) > -1) {
        return true;
      }
      return false;
    }) 
  })
  }
  getAdvertisementsOfUsers(anuncios: MeetingI[], usuarios: UsuariosI[]): MeetingI[] {
    return anuncios.filter(function(res){
      if(usuarios.find(element => {
        return element.id == res.userId;
      }))return true;
      else return false;
    });
  }
  updateAnuncio(anuncio: MeetingI, id: string) {
    return this.anunciosCollection.doc(id).update(anuncio);
  }

  addAnuncio(anuncio: MeetingI) {
    this.userProvider.getCurrentUser().pipe(take(1)).toPromise()
      .then(usuario => {
        anuncio.userId = usuario.id;
        anuncio.name = usuario.name;
        return this.anunciosCollection.add(anuncio);
      })
  }
  addPeticion(anuncio: MeetingI, peticion: PeticionI, anuncioId: string){
    this.userProvider.getCurrentUser().pipe(take(1)).toPromise()
      .then(usuario => {
        peticion.name = usuario.name;
        peticion.time = "" + Date.now();
        peticion.userId = usuario.id;
        anuncio.peticiones.push(peticion);
        return this.anunciosCollection.doc<MeetingI>(anuncioId).update(anuncio);
      })
  }
  removePetition(peticion: PeticionI, anuncio: MeetingI){
    anuncio.peticiones = anuncio.peticiones.filter(a => a !== peticion);
    this.anunciosCollection.doc<MeetingI>(anuncio.id).update(anuncio)
  }

  removeAnuncio(id: string) {
    return this.anunciosCollection.doc(id).delete();
  }
}

