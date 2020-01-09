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
