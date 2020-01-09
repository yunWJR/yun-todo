import {Component} from '@angular/core';
import {NavController} from '@ionic/angular';
import {Router} from '@angular/router';

@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

    constructor(
        private navCtrl: NavController,
        private router: Router,
    ) {
    }

    loginClick() {
        console.log('login');
        this.router.navigate(['login']);
    }
}
