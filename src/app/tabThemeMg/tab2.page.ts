import {Component, ViewChild} from '@angular/core';
import {IonRefresher, NavController} from '@ionic/angular';
import {Router} from '@angular/router';
import {TagStatisticsDto, ThemeDataService} from '../../rqt-service/themeData.service';
import {Theme, ThemeService} from '../../rqt-service/theme.service';
import {ThemeTagStatistics} from '../../base/api-model';
import {BasePage} from '../../base/base.page';
import {DateUtils} from '../../utils/date.utils';


@Component({
    selector: 'app-tab2',
    templateUrl: 'tab2.page.html',
    styleUrls: ['tab2.page.scss']
})
export class Tab2Page extends BasePage {
    @ViewChild('ionRefresher', {read: IonRefresher, static: false}) ionRefresher: IonRefresher;

    dateTimePickerOptions: any;
    selDateTime: string = new Date().toDateString();

    themeList: Theme[];
    selTheme: Theme;

    tagTheme: Theme;

    selTagIds: number[];
    list: ThemeTagStatistics[] = [];

    constructor(
        public navCtrl: NavController,
        private router: Router,
        public themeDataRqt: ThemeDataService,
        public themeRqt: ThemeService,
        public dateUtils: DateUtils,
    ) {
        super(navCtrl);

        this.themeList = [];
        this.selTheme = null;

        this.dateTimePickerOptions = {
            buttons: [{
                text: 'Save',
                handler: () => {
                    console.log('Clicked Save!');
                }
            }, {
                text: 'Log',
                handler: () => {
                    console.log('Clicked Log. Do not Dismiss.');
                    return false;
                }
            }]
        };
    }

    ionViewDidEnter() {
        this.getThemeListRqt();
    }

    // 加载完成后，停止刷新动画
    loadDataCmpHandle() {
        this.cmpRefresh();
    }

    doRefresh() {
        this.getThemeListRqt();
    }

    cmpRefresh() {
        if (this.ionRefresher) {
            this.ionRefresher.complete().then(r => console.log(r));
        }
    }

    // region rqt

    getThemeListRqt() {
        this.loadDataStart();

        this.themeRqt.list().subscribe((res: Theme[]) => {
            this.themeList = [];

            let hasTheme = false;
            for (const re of res) {
                this.themeList.push(re);
                if (this.selTheme && this.selTheme.id) {
                    if (this.selTheme.id === re.id) {
                        hasTheme = true;
                    }
                }
            }

            if (hasTheme === false) {
                this.selTheme = null;
            }

            if (this.themeList.length === 1) {
                this.selTheme = this.themeList[0];
            }

            this.getTagThemeRqt();
        }, (error: any) => {
            this.handleRqtError(error);
        });
    }

    getTagThemeRqt() {
        this.loadDataStart();

        if (!this.selTheme || !this.selTheme.id) {
            this.loadDataCmp();
            this.presentCommonAlert('请先选择一个主题！');
            return;
        }

        // if (this.tagTheme != null && this.tagTheme.id === this.selTheme.id) {
        //     this.loadDataCmp();
        //     return;
        // }

        this.themeRqt.info(this.selTheme.id, null).subscribe((res: Theme) => {
            this.tagTheme = res;

            if (!this.selTagIds || this.selTagIds.length < 1) {
                this.selTagIds = [];
                for (const themeTag of this.tagTheme.tagList) {
                    this.selTagIds.push(themeTag.id);
                }
            }

            this.getListRqt();
        }, (error: any) => {
            this.handleRqtError(error);
        });
    }

    getListRqt() {
        this.loadDataStart();

        if (!this.tagTheme || !this.selDateTime || !this.selTagIds || this.selTagIds.length < 1) {
            this.loadDataCmp();
            return;
        }

        const dto = new TagStatisticsDto();
        dto.themeId = this.tagTheme.id;
        dto.tagIds = this.selTagIds;
        if (this.selDateTime) {
            dto.date = this.dateUtils.dateFormat('yyyy-MM-dd', new Date(this.selDateTime));
        }

        this.themeDataRqt.tagStatistics(dto).subscribe((res: ThemeTagStatistics[]) => {
            this.list = res;

            this.loadDataCmp();
        }, (error: any) => {
            this.handleRqtError(error);
        });
    }

    // endregion

    dateTimeChange(event) {
        this.getListRqt();
    }

    themeChange(event) {
        if (event.target.value === '-1') {
            if (this.themeList.length !== 1) {
                this.selTheme = null;
                this.tagTheme = null;
            }
        } else {
            this.selTheme = this.themeList[event.target.value];

            this.themeRqt.info(this.selTheme.id, null).subscribe((res: Theme) => {
                this.tagTheme = res;
            });
        }

        this.selTagIds = null; // todo 重置控件

        this.getTagThemeRqt();
    }

    tagChange(event) {
        this.selTagIds = [];
        for (const tId of event.target.value) {
            this.selTagIds.push(tId);
        }

        this.getListRqt();
    }
}
