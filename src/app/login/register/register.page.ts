import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {NavController} from '@ionic/angular';
import {Router} from '@angular/router';
import {LoginPara, LoginService, LoginUser} from '../../../rqt-service/login.service';
import {BasePage} from '../../../base/base.page';

@Component({
    selector: 'app-register',
    templateUrl: './register.page.html',
    styleUrls: ['./register.page.scss'],
})
export class RegisterPage extends BasePage implements OnInit {
    public name: string;
    public pws: string;

    constructor(
        public navCtrl: NavController,
        private router: Router,
        public service: LoginService,
        private formBuilder: FormBuilder,
    ) {
        super(navCtrl);
    }

    ngOnInit() {
    }

    registerRqt() {
        this.loadData('注册中');

        const para = new LoginPara();
        para.acctName = this.name;
        para.password = this.pws;

        this.service.register(para).subscribe((res: LoginUser) => {
            this.presentToast('注册成功，请登录！');
            this.loadDataCmp();
            this.navCtrl.navigateRoot('/login');
        }, (error: any) => {
            this.handleRqtError(error);
        });
    }

    nagBackOn() {
        this.navCtrl.back();
    }

    registerOn() {
        if (!this.name) {
            this.presentCommonAlert('请输入帐号');
            return;
        }

        if (!this.pws) {
            this.presentCommonAlert('请输入密码');
            return;
        }

        this.registerRqt();
    }
}
