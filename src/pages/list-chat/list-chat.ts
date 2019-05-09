import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController,  AlertController, NavParams, Content } from 'ionic-angular';
import { Chat } from '../chat/chat';
import { ChatService } from '../../providers/chat-service';
import { UsuariosProvider } from '../../providers/usuarios';
import { UserInfo } from '../../app/models/chat.model';
@IonicPage()
@Component({
  selector: 'page-list-chat',
  templateUrl: 'list-chat.html',
})
export class ListChatPage {

  @ViewChild(Content) content: Content;

  ChatConversationList;
  user: UserInfo;

  constructor(
    public navParams: NavParams,
    private ChatService: ChatService,
    public alertController: AlertController,
    public navCtrl: NavController,
    private userProvider: UsuariosProvider) {
    //perfil loged user
    this.userProvider.getCurrentUserPromiseToChat()
      .then((user) => {
        this.user = user;
      });
  }

  async alerta(chat) {
    const alert = await this.alertController.create({
      title: 'ELIMINAR CHAT',
      message: '¿Desea eliminar el chat?',
      buttons: [
        {
          text:"Eliminar",
          handler: ()=>{             
              this.ChatService.deleteChat(chat.chatId);
              console.log("Eliminado");
          }

        },
        {
          text:"Cancelar",
          role:"cancel"
        }
      ]
    });

    await alert.present();
  }

  /**
   * @name getMsg
   * @returns {Promise<ChatConversations[]>}
   */
  getChatConversations() {
    return this.ChatService
      .getChatConversationsListForCurrentUser()
      .subscribe(ChatConversationList => {
        this.ChatConversationList = ChatConversationList
        return this.ChatConversationList;
      });
  }

  openChat(chat) {
    if (this.user.id != chat.userId) {
      chat.toUserName = chat.userName;
      chat.toUserId = chat.userId;
    }
    this.navCtrl.push(Chat, { 
      "chatId": chat.chatId, 
      "toUserId": chat.userId, 
      "toUserName": chat.toUserName,
      "valoration": chat.valoration });
  }

  ionViewDidEnter() {
    this.getChatConversations();
  }
}
