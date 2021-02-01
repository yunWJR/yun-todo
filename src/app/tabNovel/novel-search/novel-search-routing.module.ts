import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {NovelSearchPage} from './novel-search-page.component';

const routes: Routes = [
    {
        path: '',
        component: NovelSearchPage
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class NovelSearchPageRoutingModule {
}
