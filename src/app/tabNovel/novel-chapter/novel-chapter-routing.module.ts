import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {NovelChapterPage} from './novel-chapter-page.component';

const routes: Routes = [
    {
        path: '',
        component: NovelChapterPage
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class NovelChapterPageRoutingModule {
}
