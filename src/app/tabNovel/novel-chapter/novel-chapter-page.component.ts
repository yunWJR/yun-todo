import {Component, OnInit, ViewChild} from '@angular/core';
import {BasePage} from '../../../base/base.page';
import {IonRefresher, NavController} from '@ionic/angular';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {NovelChapterData, NovelService} from '../../../rqt-service/novel.service';
import {HttpParams} from '@angular/common/http';

@Component({
    selector: 'app-novel-chapter-page',
    templateUrl: './novel-chapter-page.component.html',
    styleUrls: ['./novel-chapter-page.component.scss'],
})
export class NovelChapterPage extends BasePage implements OnInit {
    @ViewChild('ionRefresher', {read: IonRefresher, static: false}) ionRefresher: IonRefresher;

    title: string;
    videoUrl: string;
    // sort = 0;

    // list: NovelChapterData[];

    constructor(
        public navCtrl: NavController,
        public router: Router,
        public novelRqt: NovelService,
        public activeRoute: ActivatedRoute,
    ) {
        super(navCtrl);

        this.activeRoute.queryParams.subscribe((params: Params) => {
            this.title = params.title;
            this.videoUrl = params.videoUrl;
        });
    }

    // region lift cycle

    ngOnInit() {
    }

    ionViewDidEnter() {
        // this.getChapterListRqt(false);
    }

    // 加载完成后，停止刷新动画
    loadDataCmpHandle() {
        this.cmpRefresh();
    }

    // endregion

    // region rqt

    // endregion

    // region handle

    nagBackOn() {
        this.navCtrl.back();
    }

    chapterOn(item: NovelChapterData) {
        // this.navCtrl.navigateForward('tabs/novel/chapter', {
        //     queryParams: {
        //         novelId: this.novelId,
        //         chapterId: item.id,
        //     }
        // });
    }

    // endregion

    doRefresh() {
        // this.getChapterListRqt(true);
    }

    cmpRefresh() {
        if (this.ionRefresher) {
            this.ionRefresher.complete();
        }
    }

    reverse() {
        // this.getChapterListRqt(false);
    }
}