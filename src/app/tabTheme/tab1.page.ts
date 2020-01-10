import {Component, ViewChild} from '@angular/core';
import {ActionSheetController, IonRefresher, NavController, PopoverController} from '@ionic/angular';
import {Router} from '@angular/router';
import {TagPropData, ThemeDataService, ThemeTagData} from '../../core/themeData.service';
import {HttpParams} from '@angular/common/http';
import {Theme, ThemeService} from '../../core/theme.service';
import {CreateTagComponent} from './create-tag/create-tag.component';

@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
    @ViewChild('ionRefresher', {read: IonRefresher, static: false}) ionRefresher: IonRefresher;

    dateTimePickerOptions: any;
    selDateTime: string = new Date().toDateString();


    themeList: Theme[];
    selTheme: Theme;
    selThemeD: '全部';

    list: ThemeTagData[] = [];

    constructor(
        public navCtrl: NavController,
        private router: Router,
        public themeDataRqt: ThemeDataService,
        public themeRqt: ThemeService,
        public actionSheetController: ActionSheetController,
        public popoverController: PopoverController,
    ) {

        this.themeList = [this.allTheme()];
        this.selTheme = this.themeList[0];
        this.selThemeD = '全部';

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

    doRefresh() {
        this.getList();
    }

    getList() {

        let params = new HttpParams();
        if (this.selTheme.id) {
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
            this.themeList = [this.allTheme()];

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
                this.selTheme = this.themeList[0];
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
        if (this.selTheme != null) {
            this.presentActionSheet(this.selTheme);

            return;
        }

        let themeId = null;
        if (this.selTheme) {
            themeId = this.selTheme.id;
        }

        this.themeRqt.info(themeId, null).subscribe((res: Theme) => {
            this.selTheme = res;

            // 选择填写的信息
            this.presentActionSheet(res);
        });
    }

    addTagData(tagId: number) {
        let tag = null;

        for (const tagIt of this.selTheme.tagList) {
            if (tagIt.id === tagId) {
                tag = tagIt;
                break;
            }
        }

        if (tag == null) {
            return;
        }

        console.log(tag);

        const rst = this.presentPopover(null, tag);
    }

    async presentPopover(ev: any, tag: any) {
        const popover = await this.popoverController.create({
            component: CreateTagComponent,
            event: ev,
            translucent: true,
            componentProps: {
                tag: tag,
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
                this.getList();
            }
        }
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
        console.log(this.selDateTime);

        this.getList();
    }

    allTheme(): Theme {
        const allTm = new Theme();
        allTm.name = '全部';
        allTm.id = null;

        return allTm;
    }

    themeChange(event) {
        this.selTheme = this.themeList[event.target.value];

        this.getList();
    }
}
