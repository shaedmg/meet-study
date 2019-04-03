import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { map } from 'rxjs/operators/map';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { UserInfo, ChatMessage } from "../app/models/chat.model";
import { UsuariosProvider } from './usuarios';
import { AngularFirestore } from 'angularfire2/firestore';


@Injectable()
export class ChatService {

  constructor(private http: HttpClient,
    private events: Events,
    public afs: AngularFirestore,
    private UP: UsuariosProvider) {
  }
  //mockNewMsg lo que hace es devolver un mensaje a los
  // 2 segundos que dice gilipollas
  mockNewMsg(msg) {
    const mockMsg: ChatMessage = {
      messageId: Date.now().toString(),
      userId: '2',
      userName: 'Santi',
      userAvatar: './assets/to-user.jpg',
      toUserId: '1',
      time: Date.now(),
      message: "gilipollas",
      status: 'success'
    };

    setTimeout(() => {
      this.events.publish('chat:received', mockMsg, Date.now())
    }, Math.random() * 1800)
  }

  getMsgList(): Observable<ChatMessage[]> {
    //obtener lista de mensajes del chat con otro usuario x
    const msgListUrl = './assets/mock/msg-list.json';
    return this.http.get<any>(msgListUrl)
      .pipe(map(response => response.array));
  }

  sendMsg(msg: ChatMessage) {
    //guardar en la base de datos y (el metodo de firebase)avisar al otro que tiene mensaje
    return new Promise(resolve => setTimeout(() => resolve(msg), Math.random() * 1000))
      .then(() => this.mockNewMsg(msg));
  }

  getUserInfo(): Promise<UserInfo> {
    var user = this.UP.getUsuario();
    return new Promise(resolve => resolve(user));
  }

}
