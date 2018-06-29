import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartEnpalsPaymentsComponent } from './chart-enpals-payments.component';

describe('ChartEnpalsPaymentsComponent', () => {
  let component: ChartEnpalsPaymentsComponent;
  let fixture: ComponentFixture<ChartEnpalsPaymentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartEnpalsPaymentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartEnpalsPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
