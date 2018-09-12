import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetributionBandsComponent } from './retribution-bands.component';

describe('RetributionBandsComponent', () => {
  let component: RetributionBandsComponent;
  let fixture: ComponentFixture<RetributionBandsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetributionBandsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetributionBandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
