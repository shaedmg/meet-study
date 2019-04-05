import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators/map';
import { ChatMessage, UserInfo } from "../app/models/chat.model";
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { UsuariosProvider } from './usuarios';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
export class ChatConversations {
  chatMessage: ChatMessage[];
}

@Injectable()
export class ChatService {

  user: UserInfo;
  ChatConversationsId: string;
  private ChatMessageCollections: AngularFirestoreCollection<ChatConversations>;

  constructor(
    public afdb: AngularFireDatabase,
    public afs: AngularFirestore,
    private userProvider: UsuariosProvider) {
    this.ChatMessageCollections = this.afs.collection<ChatConversations>(`ChatConversations`);
    //perfil loged user
    this.userProvider.getCurrentUserPromiseToChat()
      .then((user) => {
        this.user = user;
      });
  }
  async addChat(petitionUserId) {
    try {
      let newMsg: ChatMessage = {
        messageId: Date.now().toString(),
        chatId: Date.now().toString(),
        userId: this.user.id,
        userName: this.user.name,
        userAvatar: this.user.avatar,
        toUserId: petitionUserId,
        time: Date.now(),
        message: "Hola me gustaría estudiar contigo",
        status: 'pending',
      };
      const ChatConversationsCollectionDocument: AngularFirestoreDocument = this.afs.doc(`ChatConversations/${newMsg.chatId}`);
      await ChatConversationsCollectionDocument.set({ "userId": newMsg.userId, "toUserId": newMsg.toUserId, "toUserName": newMsg.userName, "chatId": newMsg.chatId });
      const ChatMessageDocument: AngularFirestoreDocument<ChatMessage> = this.afs.doc(`ChatConversations/${newMsg.chatId}/ChatMessage/${newMsg.messageId}`);
      await ChatMessageDocument.set(newMsg);
      return newMsg.chatId;
    } catch (error) { console.error(error) }

  }

  getMsgList(chatId): Observable<any> {
    return this.afs.collection('ChatConversations').doc(chatId).collection('ChatMessage').valueChanges();
  }

  getChatConversationsListForCurrentUser(): Observable<any> {
    return this.ChatMessageCollections.snapshotChanges().pipe(
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
      const ChatMessageDocument: AngularFirestoreDocument<ChatMessage> = this.afs.doc(`ChatConversations/${msg.chatId}/ChatMessage/${msg.messageId}`);
      await ChatMessageDocument.set(msg);
    } catch (error) { console.log(error)}
  }
}
