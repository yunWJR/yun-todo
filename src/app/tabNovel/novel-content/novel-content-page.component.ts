import {Component, OnInit, ViewChild} from '@angular/core';
import {BasePage} from '../../../base/base.page';
import {IonContent, IonRefresher, NavController} from '@ionic/angular';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {DateUtils} from '../../../utils/date.utils';
import {NovelChapterData, NovelService} from '../../../rqt-service/novel.service';

@Component({
    selector: 'app-novel-content-page',
    templateUrl: './novel-content-page.component.html',
    styleUrls: ['./novel-content-page.component.scss'],
})
export class NovelContentPage extends BasePage implements OnInit {
    @ViewChild('ionRefresher', {read: IonRefresher, static: false}) ionRefresher: IonRefresher;

    @ViewChild('ionCtn', {read: IonContent, static: false}) ionCtn: IonContent;

    novelId: number;
    chapterId: number;

    data: NovelChapterData = new NovelChapterData();

    constructor(
        public navCtrl: NavController,
        public router: Router,
        public novelRqt: NovelService,
        public dateUtils: DateUtils,
        public activeRoute: ActivatedRoute,
    ) {
        super(navCtrl);

        this.activeRoute.queryParams.subscribe((params: Params) => {
            this.novelId = params.novelId;
            this.chapterId = params.chapterId;
        });
    }

    // region lift cycle

    ngOnInit() {
    }

    ionViewDidEnter() {
        this.getDataRqt();
    }

    // 加载完成后，停止刷新动画
    loadDataCmpHandle() {
        this.cmpRefresh();
    }

    // endregion

    // region rqt

    getDataRqt() {
        this.loadDataStart();

        this.novelRqt.chapterContent(this.chapterId, null).subscribe((res: NovelChapterData) => {
            // 格式化
            res.content = res.content.replace(new RegExp('　　    ', 'gm'), '\t');

            this.data = res;

            this.ionCtn.scrollToTop();

            this.loadDataCmp();
        }, (error: any) => {
            this.handleRqtError(error);
        });
    }

    // endregion

    // region handle

    nagBackOn() {
        // this.navCtrl.back();
        this.navCtrl.navigateBack('tabs/novel', {});
    }

    // endregion

    doRefresh() {
        this.getDataRqt();
    }

    cmpRefresh() {
        if (this.ionRefresher) {
            this.ionRefresher.complete();
        }
    }

    chapterOn() {
        this.navCtrl.navigateForward('tabs/novel/chapterList', {
            queryParams: {
                novelId: this.novelId,
            }
        });
    }

    preChapter() {
        this.chapterId = this.data.preId;
        this.getDataRqt();
    }

    nexChapter() {
        this.chapterId = this.data.nextId;
        this.getDataRqt();
    }
}
