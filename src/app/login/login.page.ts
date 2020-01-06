import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators, FormGroup, AbstractControl} from '@angular/forms';
import {Events, NavController, NavParams} from '@ionic/angular';
import {Router} from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    private username: AbstractControl;
    private password: AbstractControl;
    private loginForm: FormGroup;

    constructor(public navCtrl: NavController,
                private router: Router,
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
        this.navCtrl.navigateForward('');
    }

    register() {
        console.log('register');
        this.navCtrl.navigateForward('/login/register');
    }
}
