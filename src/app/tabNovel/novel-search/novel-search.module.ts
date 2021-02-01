import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {NovelSearchPageRoutingModule} from './novel-search-routing.module';

import {NovelSearchPage} from './novel-search-page.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        NovelSearchPageRoutingModule
    ],
    declarations: [NovelSearchPage]
})
export class NovelSearchPageModule {
}
