import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportMonthlyCostEnpalsComponent } from './report-monthly-cost-enpals.component';

describe('ReportMonthlyCostEnpalsComponent', () => {
  let component: ReportMonthlyCostEnpalsComponent;
  let fixture: ComponentFixture<ReportMonthlyCostEnpalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportMonthlyCostEnpalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportMonthlyCostEnpalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
