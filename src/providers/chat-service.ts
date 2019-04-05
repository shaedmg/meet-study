import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators/map';
import { Observable } from "rxjs/Observable";
import { ChatMessage, UserInfo } from "../app/models/chat.model";
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { UsuariosProvider } from './usuarios';
import { AngularFireDatabase } from 'angularfire2/database';
export class ChatConversations {
  chatMessage: ChatMessage[];
}

@Injectable()
export class ChatService {

  user: UserInfo;
  ChatConversationsId:string;
  private ChatMessageCollections: AngularFirestoreCollection<ChatConversations>;

  constructor(
    public afdb: AngularFireDatabase,
    public afs: AngularFirestore,
    private userProvider: UsuariosProvider) {
    //creo la conexión con los mensajes
    this.ChatMessageCollections = afs.collection<ChatConversations>('ChatConversations');
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
        status: 'pending',
        conversationId: ""
      };
      let chat: ChatConversations ={
        chatMessage: [newMsg]
      }
      this.ChatMessageCollections.add(chat);
    } catch (error) { console.log(error) }
  }

  getMsgList(userId) {/*
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        }).filter(res =>
          (res.userId == userId || res.toUserId == userId) &&
          (res.userId == this.user.id || res.toUserId == this.user.id)
        );return new observable(this.ChatMessageDocument.snapshotChanges().pipe());
      })*/
  }

  getChatConversationsListForCurrentUser(){
    return this.ChatMessageCollections.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        })
        .filter(
          res => res.chatMessage[0].userId == this.user.id ||
                 res.chatMessage[0].toUserId == this.user.id 
          );
      }));
  }

  async sendMsg(msg: ChatMessage) {
    try {
      const ChatMessageDocument: AngularFirestoreDocument<ChatMessage> = this.afs.doc(`ChatConversation/${msg.conversationId}/ChatMessage/${msg.messageId}`);
      await ChatMessageDocument.set(msg);
    } catch (error) { }
  }
}
