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

    novelId: number;
    name: string;
    sort = 0;

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
        this.getChapterListRqt(false);
    }

    // 加载完成后，停止刷新动画
    loadDataCmpHandle() {
        this.cmpRefresh();
    }

    // endregion

    // region rqt

    getChapterListRqt(force: boolean) {
        this.loadDataStart();

        let params = new HttpParams();
        params = params.append('sort', this.sort.toString());
        params = params.append('force', force ? '1' : '0');

        this.novelRqt.chapterList(this.novelId, params).subscribe((res: NovelChapterData[]) => {
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
        this.getChapterListRqt(true);
    }

    cmpRefresh() {
        if (this.ionRefresher) {
            this.ionRefresher.complete();
        }
    }

    reverse() {
        if (this.sort === 0) {
            this.sort = 1;
        } else {
            this.sort = 0;
        }

        this.getChapterListRqt(false);
    }
}
