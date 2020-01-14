import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TabsPage} from './tabs.page';

const routes: Routes = [
    {
        path: 'tabs',
        component: TabsPage,
        children: [
            {
                path: 'tabTheme',
                children: [
                    {
                        path: '',
                        loadChildren: () =>
                            import('../tabTheme/tab1.module').then(m => m.Tab1PageModule)
                    },
                    {
                        path: 'mg',
                        loadChildren: () =>
                            import('../tabTheme/theme-mg/theme-mg.module').then(m => m.ThemeMgPageModule)
                    },
                    {
                        path: 'statistics',
                        loadChildren: () =>
                            import('../tabTheme/theme-statistics/theme-statistics.module').then(m => m.ThemeStatisticsPageModule)
                    }
                ]
            },
            {
                path: 'tabThemeMg',
                children: [
                    {
                        path: '',
                        loadChildren: () =>
                            import('../tabThemeMg/tab2.module').then(m => m.Tab2PageModule)
                    }
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
                redirectTo: '/tabs/tabTheme',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: '',
        redirectTo: '/tabs/tabTheme',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TabsPageRoutingModule {
}
