import { Component } from '@angular/core';

import {IonicPage} from "ionic-angular";

@IonicPage()
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root: any = 'ListChatPage';
  tab2Root: any = 'HomePage';
  tab3Root: any = 'AboutPage';
  constructor() {
  }
}
