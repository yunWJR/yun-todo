import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {NovelChapterPage} from './novel-chapter-page.component';

describe('ThemeMgPage', () => {
    let component: NovelChapterPage;
    let fixture: ComponentFixture<NovelChapterPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [NovelChapterPage],
            imports: [IonicModule.forRoot()]
        }).compileComponents();

        fixture = TestBed.createComponent(NovelChapterPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
