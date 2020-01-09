import {Component, ViewChild} from '@angular/core';
import {ActionSheetController, IonRefresher, NavController} from '@ionic/angular';
import {Router} from '@angular/router';
import {TagPropData, ThemeDataService, ThemeTagData} from '../../core/themeData.service';
import {HttpParams} from '@angular/common/http';
import {Theme, ThemeService} from '../../core/theme.service';

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

        if (propData.prop.dataUnit.length > 0) {

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
        console.log(tagId);
    }

    // 选择
    async presentActionSheet(res: Theme) {
        const buttons = [];
        for (const tag of res.tagList) {
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
            text: 'Cancel',
            icon: 'close',
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
