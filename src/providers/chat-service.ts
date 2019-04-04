import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators/map';
import { Observable } from "rxjs/Observable";
import { ChatMessage, UserInfo } from "../app/models/chat.model";
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { UsuariosProvider } from './usuarios';
import { AngularFireDatabase } from 'angularfire2/database';
export class ChatConversations {
   chatMessages: AngularFirestoreDocument<ChatMessage>;
}

@Injectable()
export class ChatService {

  user: UserInfo;
  private ChatMessageDocument: AngularFirestoreDocument<ChatMessage>;
  private ChatConversationsCollection: AngularFirestoreCollection<ChatConversations>;

  constructor(
    public afdb: AngularFireDatabase,
    public afs: AngularFirestore,
    private userProvider: UsuariosProvider) {
    //creo la conexión con los mensajes
    this.ChatMessageDocument = afs.doc<ChatMessage>('ChatMessage');
    this.ChatConversationsCollection = afs.collection<ChatConversations>('ChatConversations');
    //perfil loged user
    this.userProvider.getCurrentUserPromiseToChat()
      .then((user) => {
        this.user = user;
      });
  }
  async addChat(petitionUserId){
    try {
      let newMsg: ChatMessage = {
        messageId: Date.now().toString(),
        userId: this.user.id,
        userName: this.user.name,
        userAvatar: this.user.avatar,
        toUserId: petitionUserId,
        time: Date.now(),
        message: "Hola me gustaría estudiar contigo",
        status: 'pending'
      }; 
      const chat: ChatConversations = {chatMessages: this.ChatMessageDocument}
      console.log("hola")
      this.afdb.database.ref("ChatConversations/hola").set({});
      //await this.ChatConversationsCollection.doc("hola").update(newMsg);
   //   await this.ChatMessageDocument.update(newMsg);
    } catch (error) { console.log(error) }
  }

  getMsgList(userId): Observable<ChatMessage[]> {
    return this.ChatMessageDocument.snapshotChanges().pipe(
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
        });
      }));
  }

  async sendMsg(msg: ChatMessage) {
    try {
      const ChatMessageDocument: AngularFirestoreDocument<ChatMessage> = this.afs.doc(`ChatMessage/${msg.messageId}`);
      await ChatMessageDocument.set(msg);
    } catch (error) { }
  }
}
