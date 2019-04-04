import { Component, Injectable, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import { Chat } from '../chat/chat';
import { ChatService } from '../../providers/chat-service';
import { UsuariosProvider } from '../../providers/usuarios';
import { UserInfo } from '../../app/models/chat.model';
import {  ChatConversations } from '../../providers/chat-service';
import { Observable } from 'rxjs';
@IonicPage()
@Component({
  selector: 'page-list-chat',
  templateUrl: 'list-chat.html',
})
export class ListChatPage {

  @ViewChild(Content) content: Content;

  ChatConversationList:ChatConversations[];
  user: UserInfo;

  constructor(
    public navParams: NavParams,
    private ChatService: ChatService,
    public navCtrl: NavController,
    private userProvider: UsuariosProvider) {
    //perfil loged user
    this.userProvider.getCurrentUserPromiseToChat()
      .then((user) => {
        this.user = user;
      });
  }

  openChat(id: string, name: string) {
    this.navCtrl.push(Chat, { "toUserId": id, "toUserName": name });
  }

  /**
   * @name getMsg
   * @returns {Promise<ChatConversations[]>}
   */
 /* getChatConversations(){
    return this.ChatService
      .getChatConversationsListForCurrentUser(this.user.id)
      .subscribe(res => {
        this.ChatConversationList = res;
      }).unsubscribe();
  }
*/
  ionViewWillLeave() { }

  ionViewDidEnter() {
    console.log("entra en la jodida mierda esta")
    //this.getChatConversations();
    console.log(this.ChatConversationList)
  }
}
