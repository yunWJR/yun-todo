import {Component, ViewChild} from '@angular/core';
import {IonInfiniteScroll, NavController} from '@ionic/angular';
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
    @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

    public pData: PageList<Theme> = new PageList<Theme>();
    public list: Theme[];

    constructor(public navCtrl: NavController,
                private router: Router,
                public service: ThemeService
    ) {
        this.getPageList(null);
    }

    loadData(event) {
        this.pData.pageIndex = this.pData.pageIndex + 1;
        this.getPageList(event);
    }

    getPageList(event) {
        const params = new HttpParams()
            .set('pageIndex', this.pData.pageIndex.toString())
            .set('pageSize', this.pData.pageSize.toString());

        this.service.page(params).subscribe((res: any) => {
            console.log(res);

            this.pData = this.pData.addPage(res);
            console.log( this.pData);

            this.list = this.pData.results
            // for (const it of this.pData.results) {
            //     this.list.push(it);
            // }
            console.log( this.list);

            if (event != null) {
                event.target.complete();
                event.target.disabled = this.pData.loadCmp();
            }
        });
    }

    toggleInfiniteScroll() {
        this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
    }
}
