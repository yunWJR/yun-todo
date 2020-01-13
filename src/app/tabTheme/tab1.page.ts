import {Component, OnInit, ViewChild} from '@angular/core';
import {ActionSheetController, AlertController, IonRefresher, NavController, PopoverController} from '@ionic/angular';
import {Router} from '@angular/router';
import {TagPropData, ThemeDataService, ThemeTagData} from '../../rqt-service/themeData.service';
import {HttpParams} from '@angular/common/http';
import {Theme, ThemeService} from '../../rqt-service/theme.service';
import {CreateTagComponent} from './create-tag/create-tag.component';
import {BasePage} from '../../base/base.page';
import {DateUtils} from '../../utils/date.utils';

@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss']
})
export class Tab1Page extends BasePage implements OnInit {
    @ViewChild('ionRefresher', {read: IonRefresher, static: false}) ionRefresher: IonRefresher;

    dateTimePickerOptions: any;
    selDateTime: string = new Date().toDateString();

    themeList: Theme[];
    selTheme: Theme;

    tagTheme: Theme;

    list: ThemeTagData[] = [];

    constructor(
        public navCtrl: NavController,
        public router: Router,
        public themeDataRqt: ThemeDataService,
        public themeRqt: ThemeService,
        public actionSheetController: ActionSheetController,
        public popoverController: PopoverController,
        public alertController: AlertController,
        public dateUtils: DateUtils,
    ) {
        super();

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

    ngOnInit() {
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

            this.getListRqt();
        }, (error: any) => {
            this.handleRqtError(error);
        });
    }

    getListRqt() {
        this.loadDataStart();

        let params = new HttpParams();
        if (this.selTheme) {
            const tmId = this.selTheme.id.toString();
            params = params.append('themeId', tmId);
        }

        if (this.selDateTime) {
            const dateTime = this.dateUtils.dateFormat('yyyy-MM-dd', new Date(this.selDateTime));
            params = params.append('date', dateTime);
        }

        this.themeDataRqt.list(params).subscribe((res: ThemeTagData[]) => {
            this.list = res;

            this.loadDataCmp();
        }, (error: any) => {
            this.handleRqtError(error);
        });
    }

    // endregion

    propText(propData: TagPropData): string {
        let vl = propData.propData.orgValue;

        if (propData.prop.dataUnit) {
            vl = vl + ' ' + propData.prop.dataUnit;
        }

        return vl;
    }

    addTagOn() {
        if (!this.selTheme) {
            this.presentAlert('请先选择一个主题！');
            return;
        }

        if (this.tagTheme != null && this.tagTheme.id === this.selTheme.id) {
            this.presentTagActionSheet(this.tagTheme);

            return;
        }


        let themeId = null;
        if (this.selTheme) {
            themeId = this.selTheme.id;
        }

        this.themeRqt.info(themeId, null).subscribe((res: Theme) => {
            this.tagTheme = res;

            this.presentTagActionSheet(this.tagTheme);
        });
    }

    // 选择
    async presentTagActionSheet(res: Theme) {
        const buttons = [];
        for (const tag of res.tagList) {
            if (tag.propList.length === 0) {
                continue;
            }
            const bt = {
                text: tag.name,
                role: '',
                icon: '',
                handler: () => {
                    this.gotoAddTag(tag.id);
                }
            };
            buttons.push(bt);
        }

        // cancel
        buttons.push({
            text: '取 消',
            // icon: 'close',
            role: 'cancel',
            handler: () => {
                console.log('Cancel clicked');
            }
        });

        const actionSheet = await this.actionSheetController.create({
            header: '选择记录类型',
            buttons: buttons,
        });
        await actionSheet.present();
    }

    gotoAddTag(tagId: number) {
        let tag = null;

        for (const tagIt of this.tagTheme.tagList) {
            if (tagIt.id === tagId) {
                tag = tagIt;
                break;
            }
        }

        if (tag == null) {
            return;
        }

        const rst = this.presentAddTagPopover(null, tag);
    }

    async presentAddTagPopover(ev: any, tag: any) {
        const selDate = this.dateUtils.dateFormat('yyyy-MM-dd', new Date(this.selDateTime));
        const popover = await this.popoverController.create({
            component: CreateTagComponent,
            event: ev,
            translucent: true,
            componentProps: {
                tag: tag,
                selDate: selDate,
            },
            cssClass: 'create-tag',
        });

        // 打开
        await popover.present();

        // 返回结果
        const {data} = await popover.onWillDismiss();
        console.log(data);
        if (data != null) {
            // 重新加载数据
            if (data.save === true) {
                this.getListRqt();
            }
        }
    }

    dateTimeChange(event) {
        this.getListRqt();
    }

    themeChange(event) {
        if (event.target.value === '-1') {
            if (this.themeList.length !== 1) {
                this.selTheme = null;
            }
        } else {
            this.selTheme = this.themeList[event.target.value];
        }

        this.getListRqt();
    }
}
