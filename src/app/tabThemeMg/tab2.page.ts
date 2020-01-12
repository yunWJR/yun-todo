import {Component, ViewChild} from '@angular/core';
import {ActionSheetController, AlertController, IonRefresher, NavController, PopoverController} from '@ionic/angular';
import {Router} from '@angular/router';
import {TagStatisticsDto, ThemeDataService} from '../../core/themeData.service';
import {Theme, ThemeService} from '../../core/theme.service';
import {ThemeTagStatistics} from '../../core/api-model';


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

    selTagIds: number[];
    list: ThemeTagStatistics[] = [];

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

        this.getList();
        this.getThemeList();

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
        this.getThemeList();
    }

    doRefresh() {
        this.getList();
        this.getThemeList();
    }

    cmpRefresh() {
        if (this.ionRefresher) {
            this.ionRefresher.complete().then(r => console.log(r));
        }
    }

    getList() {
        if (!this.tagTheme || !this.selDateTime || !this.selTagIds || this.selTagIds.length < 1) {
            this.cmpRefresh();
            return;
        }

        const dto = new TagStatisticsDto();
        dto.themeId = this.tagTheme.id;
        dto.tagIds = this.selTagIds;
        if (this.selDateTime) {
            dto.date = this.setDate();
        }

        this.themeDataRqt.tagStatistics(dto).subscribe((res: ThemeTagStatistics[]) => {
            this.list = res;

            this.cmpRefresh();
        });
    }

    setDate(): string {
        if (this.selDateTime) {
            const dateTime = this.dateFormat('yyyy-MM-dd', new Date(this.selDateTime));

            return dateTime;
        }

        return null;
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

            if (this.themeList.length === 1) {
                this.selTheme = this.themeList[0];
            }

            this.getTagTheme();
        });
    }

    getTagTheme() {
        if (!this.selTheme) {
            this.presentAlert('请先选择一个主题！');
            return;
        }

        if (this.tagTheme != null && this.tagTheme.id === this.selTheme.id) {
            return;
        }


        let themeId = null;
        if (this.selTheme) {
            themeId = this.selTheme.id;
        }

        this.themeRqt.info(themeId, null).subscribe((res: Theme) => {
            this.tagTheme = res;
        });
    }

    dateTimeChange(event) {
        this.getList();
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

        this.getTagTheme();
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

    tagChange(event) {
        console.log(event.target.value);

        this.selTagIds = [];
        for (const tId of event.target.value) {
            this.selTagIds.push(tId);
        }

        this.getList();
    }
}
