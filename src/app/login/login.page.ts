import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NavController} from '@ionic/angular';
import {Router} from '@angular/router';
import {LoginPara, LoginService, LoginUser} from '../../core/login.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    public username: AbstractControl;
    public password: AbstractControl;
    public loginForm: FormGroup;

    constructor(public navCtrl: NavController,
                private router: Router,
                public service: LoginService,
                private formBuilder: FormBuilder) {
        this.loginForm = formBuilder.group({
            username: ['', Validators.compose([Validators.minLength(1), Validators.maxLength(16), Validators.required])],
            password: ['', Validators.compose([Validators.required, Validators.minLength(0)])]
        });
        this.username = this.loginForm.controls.username;
        this.password = this.loginForm.controls.password;
    }

    ngOnInit() {
    }

    login(value) {
        console.log(value);
        const para = new LoginPara();
        para.acctName = value.username;
        para.password = value.password;

        this.service.login(para).subscribe((res: LoginUser) => {
            sessionStorage.setItem('token', res.loginToken);
            this.navCtrl.navigateRoot('');
        });
    }

    register() {
        this.navCtrl.navigateRoot('/login/register');
    }
}
