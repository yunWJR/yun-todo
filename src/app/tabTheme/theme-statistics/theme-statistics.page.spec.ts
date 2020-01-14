import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {ThemeStatisticsPage} from './theme-statistics.page';

describe('ThemeStatisticsPage', () => {
    let component: ThemeStatisticsPage;
    let fixture: ComponentFixture<ThemeStatisticsPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ThemeStatisticsPage],
            imports: [IonicModule.forRoot()]
        }).compileComponents();

        fixture = TestBed.createComponent(ThemeStatisticsPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
