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
                            import('../tabTheme/tab1.module').then(m => m.Tab1PageModule)
                    },
                    {
                        path: 'chapter',
                        loadChildren: () => import('../tabTheme/theme-details/theme-details.module').then(m => m.ThemeDetailsPageModule)
                    },
                    {
                        path: 'chapterList',
                        loadChildren: () =>
                            import('../tabTheme/theme-mg/theme-mg.module').then(m => m.ThemeMgPageModule)
                    },
                    {
                        path: 'search',
                        loadChildren: () => import('../tabTheme/theme-template/theme-template.module').then(m => m.ThemeTemplatePageModule)
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
