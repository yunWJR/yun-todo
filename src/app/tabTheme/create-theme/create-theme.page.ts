import {Component, OnInit, ViewChild} from '@angular/core';
import {BasePage} from '../../../base/base.page';
import {IonInput, IonRefresher, NavController} from '@ionic/angular';
import {Router} from '@angular/router';
import {Theme, ThemeDto, ThemeService} from '../../../rqt-service/theme.service';

@Component({
    selector: 'app-create-theme',
    templateUrl: './create-theme.page.html',
    styleUrls: ['./create-theme.page.scss'],
})
export class CreateThemePage extends BasePage implements OnInit {
    @ViewChild('ionRefresher', {read: IonRefresher, static: false}) ionRefresher: IonRefresher;

    themeList: Theme[];

    themeName: string;

    constructor(
        public navCtrl: NavController,
        public router: Router,
        public themeRqt: ThemeService,
    ) {
        super(navCtrl);
    }

    // region lift cycle

    ngOnInit() {
    }

    ionViewDidEnter() {
        this.getThemeTmpListRqt();
    }

    // 加载完成后，停止刷新动画
    loadDataCmpHandle() {
        this.cmpRefresh();
    }

    // endregion

    // region rqt

    getThemeTmpListRqt() {
        // todo
        return;

        this.loadDataStart();

        // todo
        this.themeRqt.list().subscribe((res: Theme[]) => {
            this.themeList = res;

            this.loadDataCmp();
        }, (error: any) => {
            this.handleRqtError(error);
        });
    }

    createThemeRqt(name: string, remark: string, tmpId: number) {
        this.loadDataStart();

        const dto = new ThemeDto();
        dto.name = name;
        dto.remark = remark;
        dto.tmpId = tmpId;

        this.themeRqt.create(dto).subscribe((res: Theme) => {
            this.presentToast('模板创建成功!');

            this.navCtrl.back();
        }, (error: any) => {
            this.handleRqtError(error);
        });
    }

    // endregion

    // region handle

    nagBackOn() {
        this.navCtrl.back();
    }

    createThemeOn() {
        if (!this.themeName) {
            this.presentCommonAlert('请输入模板名称');
            return;
        }

        this.createThemeRqt(this.themeName, null, null);
    }

    createTmpThemeOn(tmp: Theme, ionInput: IonInput) {
        if (!ionInput.value) {
            this.presentCommonAlert('请输入模板名称');
            return;
        }

        this.createThemeRqt(ionInput.value, null, tmp.id);
    }

    tmpThemeOn(tmp: Theme) {
        this.navCtrl.navigateForward('tabs/tabTheme/mg/tmpDetails', {
            queryParams: {
                tmpData: tmp,
                tmpId: tmp.id,
            }
        });
    }

    // endregion

    doRefresh() {
        this.getThemeTmpListRqt();
    }

    cmpRefresh() {
        if (this.ionRefresher) {
            this.ionRefresher.complete();
        }
    }
}
