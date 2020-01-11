import {Component, ViewChild} from '@angular/core';
import {ActionSheetController, AlertController, IonRefresher, NavController, PopoverController} from '@ionic/angular';
import {Router} from '@angular/router';
import {TagPropData, ThemeDataService, ThemeTagData} from '../../core/themeData.service';
import {HttpParams} from '@angular/common/http';
import {Theme, ThemeService} from '../../core/theme.service';


@Component({
    selector: 'app-tab2',
    templateUrl: 'tab2.page.html',
    styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
    @ViewChild('ionRefresher', {read: IonRefresher, static: false}) ionRefresher: IonRefresher;

    dateTimePickerOptions: any;
    selDateTime: string = new Date().toDateString();

    themeList: Theme[];
    selTheme: Theme;

    tagTheme: Theme;

    list: ThemeTagData[] = [];

    constructor(
        public navCtrl: NavController,
        private router: Router,
        public themeDataRqt: ThemeDataService,
        public themeRqt: ThemeService,
        public actionSheetController: ActionSheetController,
        public popoverController: PopoverController,
        public alertController: AlertController,
    ) {

        this.themeList = [];
        this.selTheme = null;

        // this.getList();
        // this.getThemeList();

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
        this.getList();
        this.getThemeList();
    }

    doRefresh() {
        this.getList();
        this.getThemeList();
    }

    getList() {
        let params = new HttpParams();
        if (this.selTheme) {
            const tmId = this.selTheme.id.toString();
            params = params.append('themeId', tmId);
        }

        if (this.selDateTime) {
            const dateTime = this.dateFormat('yyyy-MM-dd', new Date(this.selDateTime));
            params = params.append('date', dateTime);
        }

        this.themeDataRqt.list(params).subscribe((res: ThemeTagData[]) => {
            this.list = res;

            this.ionRefresher.complete().then(r => console.log(r));
        });
    }

    dateFormat(fmt, date) {
        let ret;
        const opt = {
            'y+': date.getFullYear().toString(),        // 年
            'M+': (date.getMonth() + 1).toString(),     // 月
            'd+': date.getDate().toString(),            // 日
            'H+': date.getHours().toString(),           // 时
            'm+': date.getMinutes().toString(),         // 分
            'S+': date.getSeconds().toString()          // 秒
            // 有其他格式化字符需求可以继续添加，必须转化成字符串
        };
        for (const k in opt) {
            ret = new RegExp('(' + k + ')').exec(fmt);
            if (ret) {
                fmt = fmt.replace(ret[1], (ret[1].length === 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, '0')));
            }
        }
        return fmt;
    }

    getThemeList() {
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
        });
    }

    timeStr(dateTime: number): string {
        const d = new Date(dateTime / 1000);
        return d.toTimeString().substring(0, 8);
    }

    propValue(propData: TagPropData): string {
        let vl = propData.propData.orgValue;

        if (propData.prop.dataUnit) {
            vl = vl + ':' + propData.prop.dataUnit;
        }

        return vl;
    }

    addTag() {
        if (!this.selTheme) {
            this.presentAlert('请先选择一个主题！');
            return;
        }

        if (this.tagTheme != null && this.tagTheme.id === this.selTheme.id) {
            this.presentActionSheet(this.tagTheme);

            return;
        }


        let themeId = null;
        if (this.selTheme) {
            themeId = this.selTheme.id;
        }

        this.themeRqt.info(themeId, null).subscribe((res: Theme) => {
            this.tagTheme = res;

            // 选择填写的信息
            this.presentActionSheet(this.tagTheme);
        });
    }

    addTagData(tagId: number) {
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

        const rst = this.presentPopover(null, tag);
    }

    async presentPopover(ev: any, tag: any) {

    }

    // 选择
    async presentActionSheet(res: Theme) {
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
                    this.addTagData(tag.id);
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

    dateTimeChange(event) {
        this.getList();
    }

    themeChange(event) {
        if (event.target.value === -1) {
            this.selTheme = null;
        } else {
            this.selTheme = this.themeList[event.target.value];
        }

        this.getList();
    }

    async presentAlert(msg: string) {
        const alert = await this.alertController.create({
            header: '提醒',
            // subHeader: 'Subtitle',
            message: msg,
            buttons: ['确定']
        });

        await alert.present();
    }
}
