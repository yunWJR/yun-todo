import {Component, OnInit, ViewChild} from '@angular/core';
import {BasePage} from '../../../base/base.page';
import {IonRefresher, NavController} from '@ionic/angular';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Theme, ThemeService, ThemeTag, ThemeTagProp} from '../../../rqt-service/theme.service';
import {DateUtils} from '../../../utils/date.utils';

@Component({
    selector: 'app-theme-details',
    templateUrl: './theme-details.page.html',
    styleUrls: ['./theme-details.page.scss'],
})
export class ThemeDetailsPage extends BasePage implements OnInit {
    @ViewChild('ionRefresher', {read: IonRefresher, static: false}) ionRefresher: IonRefresher;

    themeId: number;

    themeData: Theme = new Theme();

    constructor(
        public navCtrl: NavController,
        public router: Router,
        public themeRqt: ThemeService,
        public dateUtils: DateUtils,
        public activeRoute: ActivatedRoute,
    ) {
        super(navCtrl);

        this.activeRoute.queryParams.subscribe((params: Params) => {
            this.themeId = params.themeId;
        });
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

        this.themeRqt.info(this.themeId, null).subscribe((res: Theme) => {
            this.themeData = res;
            console.log(res);

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
    }

    editThemeOn() {

    }

    deleteTagOn(theme: ThemeTag) {

    }

    editTagOn(theme: ThemeTag) {

    }

    addTagPropOn(theme: ThemeTag) {

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

    deleteTagPropOn(prop: ThemeTagProp) {

    }

    editTagPropOn(prop: ThemeTagProp) {

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
