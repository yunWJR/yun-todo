import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TabsPage} from './tabs.page';

const routes: Routes = [
    {
        path: 'tabs',
        component: TabsPage,
        children: [
            {
                path: 'novel',
                children: [
                    {
                        path: '',
                        loadChildren: () =>
                            import('../tabNovel/tab-novel-page.module').then(m => m.Tab1PageModule)
                    },
                    {
                        path: 'chapter',
                        loadChildren: () => import('../tabNovel/novel-content/novel-content.module').then(m => m.NovelContentPageModule)
                    },
                    {
                        path: 'chapterList',
                        loadChildren: () =>
                            import('../tabNovel/novel-chapter/novel-chapter.module').then(m => m.NovelChapterPageModule)
                    },
                    {
                        path: 'search',
                        loadChildren: () => import('../tabNovel/novel-search/novel-search.module').then(m => m.NovelSearchPageModule)
                    },
                ]
            },
            {
                path: 'tabMy',
                children: [
                    {
                        path: '',
                        loadChildren: () =>
                            import('../tabMy/tab3.module').then(m => m.Tab3PageModule)
                    }
                ]
            },
            {
                path: '',
                redirectTo: '/tabs/novel',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: '',
        redirectTo: '/tabs/novel',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TabsPageRoutingModule {
}
