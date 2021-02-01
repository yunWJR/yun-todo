import {Component, OnInit, ViewChild} from '@angular/core';
import {ActionSheetController, IonRefresher, NavController, PopoverController} from '@ionic/angular';
import {Router} from '@angular/router';
import {NovelItemData, NovelService} from '../../rqt-service/novel.service';
import {HttpParams} from '@angular/common/http';
import {BasePage} from '../../base/base.page';
import {DateUtils} from '../../utils/date.utils';

@Component({
    selector: 'app-tab-novel-page',
    templateUrl: 'tab-novel-page.component.html',
    styleUrls: ['tab-novel-page.component.scss']
})
export class TabNovelPage extends BasePage implements OnInit {
    @ViewChild('ionRefresher', {read: IonRefresher, static: false}) ionRefresher: IonRefresher;

    list: NovelItemData[] = [];

    constructor(
        public navCtrl: NavController,
        public router: Router,
        public novelRqt: NovelService,
        public actionSheetController: ActionSheetController,
        public popoverController: PopoverController,
        public dateUtils: DateUtils,
    ) {
        super(navCtrl);
    }

    // region lift cycle

    ngOnInit() {
    }

    ionViewDidEnter() {
        this.getListRqt(false);
    }

    // 加载完成后，停止刷新动画
    loadDataCmpHandle() {
        this.cmpRefresh();
    }

    // endregion

    // region rqt

    getListRqt(force: boolean) {
        this.loadDataStart();

        let params = new HttpParams();
        params = params.append('force', force ? '1' : '0');

        this.novelRqt.list(params).subscribe((res: NovelItemData[]) => {
            this.list = res;

            this.loadDataCmp();
        }, (error: any) => {
            this.handleRqtError(error);
        });
    }

    deleteNovelRqt(id: number) {
        this.loadDataStart();

        this.novelRqt.delete(id).subscribe((res: any) => {
            this.getListRqt(false);
        }, (error: any) => {
            this.handleRqtError(error);
        });
    }

    // endregion

    // region handle

    addOn() {
        this.navCtrl.navigateForward('tabs/novel/search', {});
    }

    deleteOn(item: NovelItemData, node: any) {
        node.close();

        this.presentAlertYesNo('提示', '确认删除吗？',
            (suc => {
                this.deleteNovelRqt(item.id);
            }),
            (cancel => {
            }));
    }

    mgThemeOn() {

    }

    updateAllChapter() {
        this.loadDataStart();

        this.novelRqt.updateAllChapter().subscribe((res: any) => {
            this.presentCommonAlert('刷新完成');
            this.getListRqt(false);
        }, (error: any) => {
            this.handleRqtError(error);
        });
    }

    // endregion

    doRefresh() {
        this.getListRqt(true);
    }

    cmpRefresh() {
        if (this.ionRefresher) {
            this.ionRefresher.complete();
        }
    }


    itemOn(item: NovelItemData) {
        this.navCtrl.navigateForward('tabs/novel/chapter', {
            queryParams: {
                novelId: item.id,
                chapterId: item.curChapterId,
            }
        });
    }
}
