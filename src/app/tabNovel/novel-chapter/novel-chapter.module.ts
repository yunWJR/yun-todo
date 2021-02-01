import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {NovelChapterPageRoutingModule} from './novel-chapter-routing.module';

import {NovelChapterPage} from './novel-chapter-page.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        NovelChapterPageRoutingModule
    ],
    declarations: [NovelChapterPage]
})
export class NovelChapterPageModule {
}
