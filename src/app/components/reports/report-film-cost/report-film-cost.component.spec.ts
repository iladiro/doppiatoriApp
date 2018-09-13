import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportFilmCostComponent } from './report-film-cost.component';

describe('ReportFilmCostComponent', () => {
  let component: ReportFilmCostComponent;
  let fixture: ComponentFixture<ReportFilmCostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportFilmCostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportFilmCostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
