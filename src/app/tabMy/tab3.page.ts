import {Component, OnInit, ViewChild} from '@angular/core';
import {IonRefresher, NavController} from '@ionic/angular';
import {Router} from '@angular/router';
import {BasePage} from '../../base/base.page';
import {LoginService, LoginUser} from '../../rqt-service/login.service';
import {DataStorage} from '../../base/data-storage.service';

@Component({
    selector: 'app-tab3',
    templateUrl: 'tab3.page.html',
    styleUrls: ['tab3.page.scss']
})
export class Tab3Page extends BasePage implements OnInit {
    @ViewChild('ionRefresher', {read: IonRefresher, static: false}) ionRefresher: IonRefresher;

    user: LoginUser = new LoginUser();

    constructor(
        public navCtrl: NavController,
        public router: Router,
        public loginService: LoginService,
        public dataStorage: DataStorage,
    ) {
        super(navCtrl);
    }

    // region lift cycle

    ngOnInit() {
    }

    ionViewDidEnter() {
        this.getUserInfoRqt();
    }

    // 加载完成后，停止刷新动画
    loadDataCmpHandle() {
        this.cmpRefresh();
    }

    // endregion

    // region rqt

    getUserInfoRqt() {
        this.loadDataStart();

        this.loginService.info().subscribe((res: any) => {
            this.user = res;

            this.loadDataCmp();
        }, (error: any) => {
            this.handleRqtError(error);
        });
    }

    // endregion

    // region handle

    logout() {
        this.dataStorage.clearLoginToken();

        this.navCtrl.navigateRoot('/login');
    }

    // endregion

    doRefresh() {
        this.getUserInfoRqt();
    }

    cmpRefresh() {
        if (this.ionRefresher) {
            this.ionRefresher.complete();
        }
    }
}
