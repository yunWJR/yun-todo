import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {ThemeMgPage} from './theme-mg.page';

describe('ThemeMgPage', () => {
    let component: ThemeMgPage;
    let fixture: ComponentFixture<ThemeMgPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ThemeMgPage],
            imports: [IonicModule.forRoot()]
        }).compileComponents();

        fixture = TestBed.createComponent(ThemeMgPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
