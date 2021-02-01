import {Component, OnInit, ViewChild} from '@angular/core';
import {BasePage} from '../../../base/base.page';
import {IonRefresher, NavController} from '@ionic/angular';
import {ActivatedRoute, Router} from '@angular/router';
import {DateUtils} from '../../../utils/date.utils';
import {NovelItemData, NovelService} from '../../../rqt-service/novel.service';
import {HttpParams} from '@angular/common/http';

@Component({
    selector: 'app-novel-search-pag',
    templateUrl: './novel-search-page.component.html',
    styleUrls: ['./novel-search-page.component.scss'],
})
export class NovelSearchPage extends BasePage implements OnInit {
    @ViewChild('ionRefresher', {read: IonRefresher, static: false}) ionRefresher: IonRefresher;

    name: string;

    list: NovelItemData[] = [];

    constructor(
        public navCtrl: NavController,
        public router: Router,
        public novelRqt: NovelService,
        public dateUtils: DateUtils,
        public activeRoute: ActivatedRoute,
    ) {
        super(navCtrl);
    }

    // region lift cycle

    ngOnInit() {
    }

    ionViewDidEnter() {
    }

    // 加载完成后，停止刷新动画
    loadDataCmpHandle() {
        this.cmpRefresh();
    }

    // endregion

    // region rqt

    getThemeRqt() {
        if (this.name === undefined || this.name.length === 0) {
            this.presentErrorAlert('请输入名称');
            return;
        }

        this.loadDataStart();

        let params = new HttpParams();
        params = params.append('name', this.name);

        this.novelRqt.search(this.name, params).subscribe((res: any) => {
            this.list = res;

            this.loadDataCmp();
        }, (error: any) => {
            this.handleRqtError(error);
        });
    }

    // endregion

    // region handle

    nagBackOn() {
        this.navCtrl.back();
    }


    doRefresh() {
        this.getThemeRqt();
    }

    cmpRefresh() {
        if (this.ionRefresher) {
            this.ionRefresher.complete();
        }
    }

    addItem(item: NovelItemData) {
        this.loadDataStart();

        this.novelRqt.addItem(item.srcId).subscribe((res: any) => {
            this.presentCommonAlert('添加成功');

            this.loadDataCmp();
        }, (error: any) => {
            this.handleRqtError(error);
        });
    }
}
