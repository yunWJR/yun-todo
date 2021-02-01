import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {NovelContentPage} from './novel-content-page.component';

const routes: Routes = [
    {
        path: '',
        component: NovelContentPage
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class NovelContentPageRoutingModule {
}
