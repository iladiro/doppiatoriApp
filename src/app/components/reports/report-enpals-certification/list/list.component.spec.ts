import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportEnpalsCertificationComponent } from './report-enpals-certification.component';

describe('ReportEnpalsCertificationComponent', () => {
  let component: ReportEnpalsCertificationComponent;
  let fixture: ComponentFixture<ReportEnpalsCertificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportEnpalsCertificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportEnpalsCertificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
