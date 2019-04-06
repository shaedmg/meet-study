import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import { Chat } from '../chat/chat';
import { ChatService } from '../../providers/chat-service';
import { UsuariosProvider } from '../../providers/usuarios';
import { UserInfo, ChatConversations } from '../../app/models/chat.model';
@IonicPage()
@Component({
  selector: 'page-list-chat',
  templateUrl: 'list-chat.html',
})
export class ListChatPage {

  @ViewChild(Content) content: Content;

  ChatConversationList: ChatConversations[][];
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

  openChat(chat) {
    if (this.user.id != chat.userId) {
      chat.toUserName = chat.userName;
      chat.toUserId = chat.userId;
    }
    console.log(chat)
    this.navCtrl.push(Chat, { "chatId": chat.chatId, "toUserId": chat.userId, "toUserName": chat.toUserName });
  }

  /**
   * @name getMsg
   * @returns {Promise<ChatConversations[]>}
   */
  getChatConversations() {
    return this.ChatService
      .getChatConversationsListForCurrentUser()
      .subscribe(ChatConversationList => {
        console.log(ChatConversationList)
        this.ChatConversationList = ChatConversationList
        return this.ChatConversationList;
      });
  }

  ionViewWillLeave() { }

  ionViewDidEnter() {
    this.getChatConversations();
  }
}
