import {Component, ViewChild} from '@angular/core';
import {IonInfiniteScroll, IonRefresher, NavController} from '@ionic/angular';
import {Router} from '@angular/router';
import {Theme, ThemeService} from '../../core/theme.service';
import {PageList} from '../../core/base-model';
import {HttpParams} from '@angular/common/http';


@Component({
    selector: 'app-tab2',
    templateUrl: 'tab2.page.html',
    styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
    @ViewChild('ionRefresher', {read: IonRefresher, static: false}) ionRefresher: IonRefresher;
    @ViewChild('infiniteScroll', {read: IonInfiniteScroll, static: false}) infiniteScroll: IonInfiniteScroll;
    // @ViewChild('ionVirtualScroll', {read: IonVirtualScroll, static: false}) ionVirtualScroll: IonVirtualScroll;

    public pData: PageList<Theme> = new PageList<Theme>();

    constructor(public navCtrl: NavController,
                private router: Router,
                public service: ThemeService
    ) {
        this.getPageList();
    }

    doRefresh() {
        this.getPageList();
    }

    loadNextPageData(event) {
        this.getMorePageList();
    }

    getPageList() {
        const params = new HttpParams();

        this.service.page(params).subscribe((res: PageList<Theme>) => {
            this.pData = new PageList<Theme>();

            this.pData.appendPage(res);

            this.ionRefresher.complete().then(r => console.log(r));

            this.infiniteScroll.disabled = this.pData.loadCmp();
        });
    }

    getMorePageList() {
        this.pData.pageIndex = this.pData.pageIndex + 1;

        const params = new HttpParams()
            .set('pageIndex', this.pData.pageIndex.toString())
            .set('pageSize', this.pData.pageSize.toString());

        this.service.page(params).subscribe((res: PageList<Theme>) => {

            this.pData.appendPage(res);

            this.ionRefresher.complete().then(r => console.log(r));

            this.infiniteScroll.complete();

            this.infiniteScroll.disabled = this.pData.loadCmp();
        });
    }
}
