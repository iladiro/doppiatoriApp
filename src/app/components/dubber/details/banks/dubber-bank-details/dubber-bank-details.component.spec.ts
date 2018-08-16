import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DubberBankDetailsComponent } from './dubber-bank-details.component';

describe('DubberBankDetailsComponent', () => {
  let component: DubberBankDetailsComponent;
  let fixture: ComponentFixture<DubberBankDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DubberBankDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DubberBankDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
