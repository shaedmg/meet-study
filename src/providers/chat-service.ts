import { Injectable } from '@angular/core';
import { ChatMessage, UserInfo, ChatConversations } from "../app/models/chat.model";
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { UsuariosProvider } from './usuarios';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class ChatService {

  user: UserInfo;
  ChatConversationsId: string;

  constructor(
    public afdb: AngularFireDatabase,
    public afs: AngularFirestore,
    private userProvider: UsuariosProvider) {
    this.userProvider.getCurrentUserPromiseToChat()
      .then((user) => {
        this.user = user;
      });
  }

  async addChat(petition) {
    try {
      let newMsg: ChatMessage = {
        messageId: Date.now().toString(),
        chatId: Date.now().toString(),
        userId: this.user.id,
        userName: this.user.name,
        userAvatar: this.user.avatar,
        toUserId: petition.userId,
        time: Date.now(),
        message: "Hola me gustaría estudiar contigo",
        status: 'susses',
      };

      const ChatConversationsCollectionDocument: AngularFirestoreDocument =
        this.afs.doc(`ChatConversations/${newMsg.chatId}`);
      await ChatConversationsCollectionDocument
        .set({
          "userId": newMsg.userId,
          "userName": newMsg.userName,
          "toUserId": newMsg.toUserId,
          "toUserName": petition.name,
          "chatId": newMsg.chatId
        });

      const ChatMessageDocument: AngularFirestoreDocument<ChatMessage> =
        this.afs.doc(`ChatConversations/${newMsg.chatId}/ChatMessage/${newMsg.messageId}`);
      await ChatMessageDocument.set(newMsg);

      return newMsg.chatId;
    } catch (error) { }

  }

  getMsgList(chatId): Observable<any> {
    return this.afs.collection('ChatConversations').doc(chatId).collection('ChatMessage').valueChanges();
  }

  getChatConversationsListForCurrentUser(): Observable<ChatConversations[][]> {
    return this.afs
      .collection<ChatConversations[]>(`ChatConversations`).valueChanges();
   
  }

  async sendMsg(msg: ChatMessage) {
    try {
      const ChatMessageDocument: AngularFirestoreDocument<ChatMessage> = this.afs.doc(`ChatConversations/${msg.chatId}/ChatMessage/${msg.messageId}`);
      await ChatMessageDocument.set(msg);
    } catch (error) { }
  }
}
