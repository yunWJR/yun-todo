import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {NovelContentPageRoutingModule} from './novel-content-routing.module';

import {NovelContentPage} from './novel-content-page.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        NovelContentPageRoutingModule
    ],
    declarations: [NovelContentPage]
})
export class NovelContentPageModule {
}
