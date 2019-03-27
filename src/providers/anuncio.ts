import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MeetingI } from '../app/models/meeting.interface';

@Injectable()
export class AnuncioProvider {
  private anunciosCollection: AngularFirestoreCollection<MeetingI>;
  private todos: Observable<MeetingI[]>;

  constructor(public http: HttpClient, db: AngularFirestore) {
    this.anunciosCollection = db.collection<MeetingI>('anuncios');
  }


  getAnuncios() {
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
  updateAnuncio(anuncio: MeetingI, id: string) {
    return this.anunciosCollection.doc(id).update(anuncio);
  }
  addAnuncio(anuncio: MeetingI) {
    return this.anunciosCollection.add(anuncio);
  }
  removeAnuncio(id: string) {
    return this.anunciosCollection.doc(id).delete();
  }
}

