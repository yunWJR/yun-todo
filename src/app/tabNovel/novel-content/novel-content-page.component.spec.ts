import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {NovelContentPage} from './novel-content-page.component';

describe('ThemeDetailsPage', () => {
    let component: NovelContentPage;
    let fixture: ComponentFixture<NovelContentPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [NovelContentPage],
            imports: [IonicModule.forRoot()]
        }).compileComponents();

        fixture = TestBed.createComponent(NovelContentPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
