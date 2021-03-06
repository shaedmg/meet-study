import { Injectable } from '@angular/core';
import { ChatMessage, UserInfo, ChatConversations } from "../app/models/chat.model";
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { UsuariosProvider } from './usuarios';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/switchMap';
import { map } from 'rxjs/operators';

@Injectable()
export class ChatService {


  user: UserInfo;
  ChatConversationsId: string;
  chatConversations: AngularFirestoreCollection<ChatConversations>;

  constructor(
    public afdb: AngularFireDatabase,
    public afs: AngularFirestore,
    private userProvider: UsuariosProvider) {
    this.chatConversations = afs
      .collection<ChatConversations>('ChatConversations');
    this.userProvider.getCurrentUserPromiseToChat()
      .then((user) => {
        this.user = user;
      });
  }

  getChatConversationsListForCurrentUser(): Observable<ChatConversations[]> {
    return this.chatConversations
      .snapshotChanges().pipe(
        map(actions => {
          return actions.map(a => {
            return a.payload.doc.data();
          }).filter(data =>
            (data.userId == this.user.id ||
              data.toUserId == this.user.id)
          );
        })
      );
  }

  async addChat(petition) {
    try {
      let chatId = this.afdb.createPushId();
      const ChatConversationsCollectionDocument: AngularFirestoreDocument =
        this.afs.doc(`ChatConversations/${chatId}`);
      await ChatConversationsCollectionDocument
        .set({
          "userId": this.user.id,
          "userName": this.user.name,
          "toUserId": petition.userId,
          "toUserName": petition.name,
          "chatId": chatId
        });
      return chatId;
    } catch (error) { }

  }

  getMsgList(chatId): Observable<any> {
    return this.afs.collection('ChatConversations').doc(chatId).collection('ChatMessage').valueChanges();
  }

  getGeneralValoration(id:string):Observable <any>{
    return this.afs.collection('userProfile').doc(id).valueChanges();
  }

  async setChatValoration(valoration: number, toUserId, chatId, generalValoration,votes) {
    return (
      this.afs.collection('userProfile').doc(toUserId).update({ "generalValoration": generalValoration, "votes":votes }) &&
      this.afs.collection('ChatConversations').doc(chatId).collection('valorations').doc(toUserId).set({ "valoration": valoration }));
  }

  getValoration(userId, chatId): Observable<any> {
    return this.afs.collection('ChatConversations').doc(chatId).collection('valorations').doc(userId).valueChanges();
  }

  delValoration(id: string, chatId, oldValoration, votes) {
    this.afs.collection('userProfile').doc(id).update({ "generalValoration": oldValoration, "votes":votes })
    this.afs.collection('ChatConversations').doc(chatId).collection('valorations').doc(id).delete();
  }

  deleteChat(chatId){
      try{
        this.afs.collection('ChatConversations').doc(chatId).delete();
      }catch(error){
        console.log(error);
      }

  }

  async sendMsg(msg: ChatMessage) {
    try {
      const ChatMessageDocument: AngularFirestoreDocument<ChatMessage> = this.afs.doc(`ChatConversations/${msg.chatId}/ChatMessage/${msg.messageId}`);
      await ChatMessageDocument.set(msg);
    } catch (error) { }
  }
}
