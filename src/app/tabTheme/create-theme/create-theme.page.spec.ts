import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreateThemePage } from './create-theme.page';

describe('CreateThemePage', () => {
  let component: CreateThemePage;
  let fixture: ComponentFixture<CreateThemePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateThemePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateThemePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
