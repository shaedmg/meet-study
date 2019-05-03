import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { SubjectsI } from '../app/models/subjects.interface';

@Injectable()
export class SubjectsProvider {
  private subjectsCollection: AngularFirestoreCollection<SubjectsI>;
  private subjects: Observable<SubjectsI[]>;

  constructor(public http: HttpClient, 
    db: AngularFirestore) {
    this.subjectsCollection = db.collection<SubjectsI>('asignatura');
  }
  getSubjects(): Observable<SubjectsI[]> {
    this.subjects = this.subjectsCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      }));
      
    return this.subjects;
  }
}