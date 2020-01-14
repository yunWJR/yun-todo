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
            console.log(params);
            this.themeId = params.themeId;
        });
    }

    // region lift cycle

    ngOnInit() {
    }

    ionViewDidEnter() {
        this.getThemeRqt();
    }

    // 加载完成后，停止刷新动画
    loadDataCmpHandle() {
        this.cmpRefresh();
    }

    // endregion

    // region rqt

    getThemeRqt() {
        this.loadDataStart();

        this.themeRqt.info(this.themeId, null).subscribe((res: Theme) => {
            this.themeData = res;

            this.loadDataCmp();
        }, (error: any) => {
            this.handleRqtError(error);
        });
    }

    deleteThemeTagRqt(themeId: number) {
        this.loadDataStart();

        this.themeRqt.delete(themeId).subscribe((res: any) => {
            this.getThemeRqt();
        }, (error: any) => {
            this.handleRqtError(error);
        });
    }

    // endregion

    // region handle

    nagBackOn() {
        this.navCtrl.back();
    }

    editThemeOn() {

    }

    addTagOn() {
    }

    deleteTagOn(tag: ThemeTag) {
        this.presentAlertYesNo('提示', '确认删除分组[' + tag.name + ']吗？',
            (suc => {
                this.deleteThemeTagRqt(tag.id);
            }),
            (cancel => {
            }));
    }

    editTagOn(tag: ThemeTag) {

    }

    addTagPropOn(prop: ThemeTag) {

    }

    deleteTagPropOn(prop: ThemeTagProp) {

    }

    editTagPropOn(prop: ThemeTagProp) {

    }

    // endregion

    doRefresh() {
        this.getThemeRqt();
    }

    cmpRefresh() {
        if (this.ionRefresher) {
            this.ionRefresher.complete();
        }
    }
}
