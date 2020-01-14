import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {ThemeStatisticsPageRoutingModule} from './theme-statistics-routing.module';

import {ThemeStatisticsPage} from './theme-statistics.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ThemeStatisticsPageRoutingModule
    ],
    declarations: [ThemeStatisticsPage]
})
export class ThemeStatisticsPageModule {
}
