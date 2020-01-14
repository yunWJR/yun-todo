import {Component, OnInit} from '@angular/core';
import {BasePage} from '../../../base/base.page';
import {ActionSheetController, NavController, PopoverController} from '@ionic/angular';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ThemeDataService} from '../../../rqt-service/themeData.service';
import {ThemeService} from '../../../rqt-service/theme.service';
import {ThemeTagDataService} from '../../../rqt-service/themeTagData.service';
import {DateUtils} from '../../../utils/date.utils';

@Component({
    selector: 'app-theme-mg',
    templateUrl: './theme-mg.page.html',
    styleUrls: ['./theme-mg.page.scss'],
})
export class ThemeMgPage extends BasePage implements OnInit {

    constructor(
        public navCtrl: NavController,
        public router: Router,
        public themeDataRqt: ThemeDataService,
        public themeRqt: ThemeService,
        public actionSheetController: ActionSheetController,
        public popoverController: PopoverController,
        public themeTagDataRqt: ThemeTagDataService,
        public dateUtils: DateUtils,
        public activeRoute: ActivatedRoute,
    ) {
        super(navCtrl);

        this.activeRoute.queryParams.subscribe((params: Params) => {
            console.log(params);
        });
    }

    ngOnInit() {
    }

    nagBackOn() {
        this.navCtrl.back();
    }
}
