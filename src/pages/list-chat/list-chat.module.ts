import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LongPressModule } from 'ionic-long-press';
import { ListChatPage } from './list-chat';

@NgModule({
  declarations: [ListChatPage],
  imports: [
    LongPressModule,
    IonicPageModule.forChild(ListChatPage),
  ],
})
export class ListChatPageModule {}
