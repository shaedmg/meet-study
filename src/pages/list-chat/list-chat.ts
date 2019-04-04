import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UsuariosProvider } from '../../providers/usuarios';
import { Observable } from 'rxjs';
import { Chat } from '../chat/chat';

@IonicPage()
@Component({
  selector: 'page-list-chat',
  templateUrl: 'list-chat.html',
})
export class ListChatPage {
  usersToChat: Observable<any>;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private userProvider:UsuariosProvider) {
    this.userProvider.getAllUsersToChat()
      .then((usersToChat) => {
        this.usersToChat = usersToChat;
        
      });
  }

  openChat(id:string, name:string){
    this.navCtrl.push(Chat, {"toUserId":id,"toUserName":name});
  }

  ionViewWillLeave() {  }

  ionViewDidEnter() {  }
}