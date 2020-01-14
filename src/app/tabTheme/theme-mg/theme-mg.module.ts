import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {ThemeMgPageRoutingModule} from './theme-mg-routing.module';

import {ThemeMgPage} from './theme-mg.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ThemeMgPageRoutingModule
    ],
    declarations: [ThemeMgPage]
})
export class ThemeMgPageModule {
}
