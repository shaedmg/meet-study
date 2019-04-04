import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators/map';
import { Observable } from "rxjs/Observable";
import { ChatMessage, UserInfo, ChatConversations } from "../app/models/chat.model";
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { UsuariosProvider } from './usuarios';


@Injectable()
export class ChatService {

  user: UserInfo;
  private ChatMessageCollection: AngularFirestoreCollection<ChatMessage>;
  private ChatConversationsCollection: AngularFirestoreCollection<ChatConversations>;

  constructor(
    public afs: AngularFirestore,
    private userProvider: UsuariosProvider) {
    //creo la conexión con los mensajes
    this.ChatMessageCollection = afs.collection<ChatMessage>('ChatMessage');
    this.ChatConversationsCollection = afs.collection<ChatConversations>('ChatConversations');
    //perfil loged user
    this.userProvider.getCurrentUserPromiseToChat()
      .then((user) => {
        this.user = user;
      });
  }

  getMsgList(userId): Observable<ChatMessage[]> {
    return this.ChatMessageCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        }).filter(res =>
          (res.userId == userId || res.toUserId == userId) &&
          (res.userId == this.user.id || res.toUserId == this.user.id)
        );
      }));
  }

  getChatConversationsListForCurrentUser(userId):Observable<ChatConversations[]>{
    console.log(userId)
    return this.ChatConversationsCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        }).filter(res =>
          (res.userId == userId || res.toUserId == userId)
        );
      }));
  }

  async sendMsg(msg: ChatMessage) {
    try {
      const ChatMessageDocument: AngularFirestoreDocument<ChatMessage> = this.afs.doc(`ChatMessage/${msg.messageId}`);
      await ChatMessageDocument.set(msg);
    } catch (error) { }
  }
}
