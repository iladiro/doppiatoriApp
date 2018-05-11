import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainInformationsComponent } from './main-informations.component';

describe('MainInformationsComponent', () => {
  let component: MainInformationsComponent;
  let fixture: ComponentFixture<MainInformationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainInformationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainInformationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
