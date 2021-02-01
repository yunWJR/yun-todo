import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {NovelSearchPage} from './novel-search-page.component';

describe('ThemeTemplatePage', () => {
    let component: NovelSearchPage;
    let fixture: ComponentFixture<NovelSearchPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [NovelSearchPage],
            imports: [IonicModule.forRoot()]
        }).compileComponents();

        fixture = TestBed.createComponent(NovelSearchPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
