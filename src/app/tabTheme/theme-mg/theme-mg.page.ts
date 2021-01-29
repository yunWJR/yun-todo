import {Component, OnInit, ViewChild} from '@angular/core';
import {BasePage} from '../../../base/base.page';
import {IonRefresher, NavController} from '@ionic/angular';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {NovelChapterData, NovelService} from '../../../rqt-service/novel.service';

@Component({
    selector: 'app-theme-mg',
    templateUrl: './theme-mg.page.html',
    styleUrls: ['./theme-mg.page.scss'],
})
export class ThemeMgPage extends BasePage implements OnInit {
    @ViewChild('ionRefresher', {read: IonRefresher, static: false}) ionRefresher: IonRefresher;

    novelId: number;
    name: string;

    list: NovelChapterData[];

    constructor(
        public navCtrl: NavController,
        public router: Router,
        public novelRqt: NovelService,
        public activeRoute: ActivatedRoute,
    ) {
        super(navCtrl);

        this.activeRoute.queryParams.subscribe((params: Params) => {
            this.novelId = params.novelId;
            this.name = params.name;
        });
    }

    // region lift cycle

    ngOnInit() {
    }

    ionViewDidEnter() {
        this.getChapterListRqt();
    }

    // 加载完成后，停止刷新动画
    loadDataCmpHandle() {
        this.cmpRefresh();
    }

    // endregion

    // region rqt

    getChapterListRqt() {
        this.loadDataStart();

        this.novelRqt.chapterList(this.novelId).subscribe((res: NovelChapterData[]) => {
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

    chapterOn(item: NovelChapterData) {
        this.navCtrl.navigateForward('tabs/novel/chapter', {
            queryParams: {
                novelId: this.novelId,
                chapterId: item.id,
            }
        });
    }

    // endregion

    doRefresh() {
        this.getChapterListRqt();
    }

    cmpRefresh() {
        if (this.ionRefresher) {
            this.ionRefresher.complete();
        }
    }
}
