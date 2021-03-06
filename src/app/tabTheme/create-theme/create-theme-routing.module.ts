import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {CreateThemePage} from './create-theme.page';

const routes: Routes = [
    {
        path: '',
        component: CreateThemePage
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CreateThemePageRoutingModule {
}
