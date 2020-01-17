import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {ThemeTemplatePage} from './theme-template.page';

describe('ThemeTemplatePage', () => {
    let component: ThemeTemplatePage;
    let fixture: ComponentFixture<ThemeTemplatePage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ThemeTemplatePage],
            imports: [IonicModule.forRoot()]
        }).compileComponents();

        fixture = TestBed.createComponent(ThemeTemplatePage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
