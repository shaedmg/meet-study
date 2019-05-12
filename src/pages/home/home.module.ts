import { NgModule} from '@angular/core';
import { HomePage } from './home';
import { IonicPageModule } from 'ionic-angular';

import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
    declarations: [
        HomePage
    ],
    imports: [
        
        IonicPageModule.forChild(HomePage),
        IonicSelectableModule
    ],
})
export class HomePageModule { }