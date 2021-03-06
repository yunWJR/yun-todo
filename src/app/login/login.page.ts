import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NavController} from '@ionic/angular';
import {Router} from '@angular/router';
import {LoginPara, LoginService, LoginUser} from '../../rqt-service/login.service';
import {BasePage} from '../../base/base.page';
import {DataStorage} from '../../base/data-storage.service';
import {Theme} from '../../rqt-service/theme.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage extends BasePage implements OnInit {
    public username: AbstractControl;
    public password: AbstractControl;
    public loginForm: FormGroup;

    constructor(
        public navCtrl: NavController,
        private router: Router,
        public service: LoginService,
        private formBuilder: FormBuilder,
        private dataStorage: DataStorage,
    ) {
        super(navCtrl);

        this.loginForm = formBuilder.group({
            username: ['', Validators.compose([Validators.minLength(1), Validators.maxLength(16), Validators.required])],
            password: ['', Validators.compose([Validators.required, Validators.minLength(0)])]
        });
        this.username = this.loginForm.controls.username;
        this.password = this.loginForm.controls.password;
    }

    ngOnInit() {
    }

    loginRqt(value) {
        this.loadData('登录中');

        const para = new LoginPara();
        para.acctName = value.username;
        para.password = value.password;

        this.service.login(para).subscribe((res: LoginUser) => {
            this.dataStorage.saveLoginToken(res.loginToken);

            this.checkThemeTemplate();

        }, (error: any) => {
            this.handleRqtError(error);
        });
    }

    checkThemeTemplate() {
        this.service.checkThemeTemplate().subscribe((res: Theme) => {
            if (res && res.name) {
                this.presentToast('成功添加默认主题:' + res.name);
            }

            this.loadDataCmp();

            this.navCtrl.navigateRoot('');
        }, (error: any) => {
            this.handleRqtError(error);
        });
    }

    gotoRegister() {
        this.navCtrl.navigateForward('/login/register');
    }
}
