import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import { Events, Content } from 'ionic-angular';
import { ChatService } from "../../providers/chat-service";
import { ChatMessage, UserInfo } from "../../app/models/chat.model";
import { UsuariosProvider } from '../../providers/usuarios';
import { AngularFireDatabase } from 'angularfire2/database';
@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class Chat {

  @ViewChild(Content) content: Content;
  @ViewChild('chat_input') messageInput: ElementRef;
  msgList: ChatMessage[] = [];
  user: UserInfo;
  toUser: UserInfo;
  editorMsg = '';
  showEmojiPicker = false;
  chatId;
  oldValoration: number = -1;
  valoration: number = 0;
  generalValoration: number = 0;
  votes: number = 0;
  addVote: boolean = false;

  constructor(navParams: NavParams,
    private chatService: ChatService,
    private events: Events,
    public afdb: AngularFireDatabase,
    private userProvider: UsuariosProvider) {
    //perfil del otro
    this.toUser = {
      id: navParams.get('toUserId'),
      name: navParams.get('toUserName')
    };
    //perfil loged user
    this.userProvider.getCurrentUserPromiseToChat()
      .then((user) => {
        this.user = user;
      });
    this.chatId = navParams.get("chatId");
  }

  private delValoration() {
    if (!this.addVote) {
      this.votes=this.votes - 1;
      this.chatService.delValoration(
        this.toUser.id,
        this.chatId,
        this.generalValoration - this.oldValoration,
        this.votes);
      this.addVote = true;
      this.oldValoration=0;
      this.valoration=0;
    }
  }

  private getGeneralValoration() {
    this.chatService.getGeneralValoration(this.toUser.id)
      .subscribe(user => {
        if (user.generalValoration != null)
          this.generalValoration = user.generalValoration;
        this.toUser.name = user.name;
        this.votes = user.votes;
      });
  }

  private getValoration() {
    this.chatService.getValoration(this.toUser.id, this.chatId)
      .subscribe(valorations => {
        if (valorations != null) this.pushNewValoration(valorations.valoration);
        else this.addVote = true;
      });
  }


  /**
 * @name sendValoration
 */
  sendValoration() {
    if (this.addVote && this.oldValoration <= 0) {
      this.votes = this.votes + 1;
      this.addVote = false;
    }
    if (this.oldValoration==-1)this.oldValoration =0;
    if (this.valoration.valueOf() == 0) return;
    let newValoration = (this.generalValoration - this.oldValoration) + this.valoration;
    this.chatService.setChatValoration(this.valoration, this.toUser.id, this.chatId, newValoration, this.votes);
    console.log(
      "votos: " + this.votes +
      "General valoratio: " + this.generalValoration +
      "oldValoration: " + this.oldValoration +
      "valoration: " + this.valoration
    )
  }

  /**
  * @name pushNewValoration
  * @param valoration
  */
  pushNewValoration(valoration: number) {
    if (this.oldValoration < 0) this.oldValoration = valoration;
    else this.oldValoration = this.valoration;
    this.valoration = valoration;
  }

  ionViewWillLeave() {
    this.events.unsubscribe('chat:received');
  }

  ionViewDidEnter() {
    this.getMsg();
    this.getValoration();
    this.getGeneralValoration();
    this.events.subscribe('chat:received', msg => {
      this.pushNewMsg(msg);
    });

  }

  onFocus() {
    this.showEmojiPicker = false;
    this.content.resize();
    this.scrollToBottom();
  }

  switchEmojiPicker() {
    this.showEmojiPicker = !this.showEmojiPicker;
    if (!this.showEmojiPicker) {
      this.focus();
    } else {
      this.setTextareaScroll();
    }
    this.content.resize();
    this.scrollToBottom();
  }

  /**
   * @name getMsg
   * @returns {Promise<ChatMessage[]>}
   */
  getMsg() {
    return this.chatService
      .getMsgList(this.chatId)
      .subscribe(res => {
        this.msgList = res;
        this.scrollToBottom();
      });
  }

  /**
   * @name sendMsg
   */
  sendMsg() {
    if (!this.editorMsg.trim()) return;
    const id = this.afdb.createPushId();
    let newMsg: ChatMessage = {
      messageId: this.afdb.createPushId(),
      chatId: this.chatId,
      userId: this.user.id,
      userName: this.user.name,
      userAvatar: this.user.avatar,
      toUserId: this.toUser.id,
      time: Date.now(),
      message: this.editorMsg,
      status: 'pending'
    };

    this.pushNewMsg(newMsg);
    this.editorMsg = '';

    if (!this.showEmojiPicker) {
      this.focus();
    }

    this.chatService.sendMsg(newMsg)
      .then(() => {
        let index = this.getMsgIndexById(id);
        if (index !== -1) {
          this.msgList[index].status = 'success';
        }
      })
  }

  /**
   * @name pushNewMsg
   * @param msg
   */
  pushNewMsg(msg: ChatMessage) {
    const userId = this.user.id,
      toUserId = this.toUser.id;
    if (msg.userId === userId && msg.toUserId === toUserId || msg.toUserId === userId && msg.userId === toUserId) {
      this.msgList.push(msg);
    }
    this.scrollToBottom();
  }

  getMsgIndexById(id: string) {
    return this.msgList.findIndex(e => e.messageId === id)
  }

  scrollToBottom() {
    var messagesContent = this.content as Content;
    messagesContent.scrollTo(0, messagesContent.getContentDimensions().contentHeight, messagesContent.getContentDimensions().contentWidth);
  }

  private focus() {
    if (this.messageInput && this.messageInput.nativeElement) {
      this.messageInput.nativeElement.focus();
    }
  }

  private setTextareaScroll() {
    const textarea = this.messageInput.nativeElement;
    textarea.scrollTop = textarea.scrollHeight;
  }
}
