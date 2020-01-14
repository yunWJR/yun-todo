import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ThemeMgPage} from './theme-mg.page';

const routes: Routes = [
    {
        path: '',
        component: ThemeMgPage
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ThemeMgPageRoutingModule {
}
