import {Component, OnInit, ViewChild} from '@angular/core';
import {BasePage} from '../../../base/base.page';
import {IonRefresher, NavController} from '@ionic/angular';
import {Router} from '@angular/router';
import {Theme, ThemeService} from '../../../rqt-service/theme.service';

@Component({
    selector: 'app-theme-mg',
    templateUrl: './theme-mg.page.html',
    styleUrls: ['./theme-mg.page.scss'],
})
export class ThemeMgPage extends BasePage implements OnInit {
    @ViewChild('ionRefresher', {read: IonRefresher, static: false}) ionRefresher: IonRefresher;

    themeList: Theme[];

    constructor(
        public navCtrl: NavController,
        public router: Router,
        public themeRqt: ThemeService,
    ) {
        super(navCtrl);
    }

    // region lift cycle

    ngOnInit() {
    }

    ionViewDidEnter() {
        this.getThemeListRqt();
    }

    // 加载完成后，停止刷新动画
    loadDataCmpHandle() {
        this.cmpRefresh();
    }

    // endregion

    // region rqt

    getThemeListRqt() {
        this.loadDataStart();

        this.themeRqt.list().subscribe((res: Theme[]) => {
            this.themeList = res;

            this.loadDataCmp();
        }, (error: any) => {
            this.handleRqtError(error);
        });
    }

    deleteTheme(themeId: number) {
        this.loadDataStart();

        this.themeRqt.delete(themeId).subscribe((res: any) => {
            this.getThemeListRqt();
        }, (error: any) => {
            this.handleRqtError(error);
        });
    }

    // endregion

    // region handle

    nagBackOn() {
        this.navCtrl.back();
    }

    addThemeOn() {
        this.navCtrl.navigateForward('tabs/tabTheme/mg/create', {
            queryParams: {}
        });
    }

    clickThemeOn(theme: Theme) {
        this.navCtrl.navigateForward('tabs/tabTheme/mg/details', {
            queryParams: {
                themeData: theme,
                themeId: theme.id,
            }
        });
    }

    deleteThemeOn(item: Theme, node: any) {
        node.close();

        this.presentAlertYesNo('提示', '确认删除模板[' + item.name + ']吗？',
            (suc => {
                this.deleteTheme(item.id);
            }),
            (cancel => {
            }));
    }

    // endregion

    doRefresh() {
        this.getThemeListRqt();
    }

    cmpRefresh() {
        if (this.ionRefresher) {
            this.ionRefresher.complete();
        }
    }
}
