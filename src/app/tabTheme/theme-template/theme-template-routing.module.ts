import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ThemeTemplatePage} from './theme-template.page';

const routes: Routes = [
    {
        path: '',
        component: ThemeTemplatePage
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ThemeTemplatePageRoutingModule {
}
