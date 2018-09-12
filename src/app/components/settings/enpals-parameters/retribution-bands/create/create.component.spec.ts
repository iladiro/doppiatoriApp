import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetributionBandsCreateComponent } from './retribution-bands.component';

describe('RetributionBandsCreateComponent', () => {
  let component: RetributionBandsCreateComponent;
  let fixture: ComponentFixture<RetributionBandsCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetributionBandsCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetributionBandsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
