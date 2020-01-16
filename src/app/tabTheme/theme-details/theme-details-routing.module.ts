import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ThemeDetailsPage} from './theme-details.page';

const routes: Routes = [
    {
        path: '',
        component: ThemeDetailsPage
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ThemeDetailsPageRoutingModule {
}
