import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {TabNovelPage} from './tab-novel-page.component';

describe('Tab1Page', () => {
    let component: TabNovelPage;
    let fixture: ComponentFixture<TabNovelPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TabNovelPage],
            imports: [IonicModule.forRoot()]
        }).compileComponents();

        fixture = TestBed.createComponent(TabNovelPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
