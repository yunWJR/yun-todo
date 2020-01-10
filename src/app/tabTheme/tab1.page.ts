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

    theme: Theme;
    list: ThemeTagData[] = [];

    themeId: number;

    constructor(
        public navCtrl: NavController,
        private router: Router,
        public themeDataRqt: ThemeDataService,
        public themeRqt: ThemeService,
        public actionSheetController: ActionSheetController,
        public popoverController: PopoverController,
    ) {
        this.themeId = 1; // todo
        this.getList();
    }

    doRefresh() {
        this.getList();
    }

    getList() {
        const params = new HttpParams();

        this.themeDataRqt.list(params).subscribe((res: ThemeTagData[]) => {
            this.list = res;

            this.theme = null;

            this.ionRefresher.complete().then(r => console.log(r));
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
        if (this.theme != null) {
            this.presentActionSheet(this.theme);

            return;
        }

        this.themeRqt.info(this.themeId, null).subscribe((res: Theme) => {
            this.theme = res;

            // 选择填写的信息
            this.presentActionSheet(res);
        });
    }

    addTagData(tagId: number) {
        let tag = null;

        for (const tagIt of this.theme.tagList) {
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
}
