import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DubberInvoiceComponent } from './dubber-invoice.component';

describe('DubberInvoiceComponent', () => {
  let component: DubberInvoiceComponent;
  let fixture: ComponentFixture<DubberInvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DubberInvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DubberInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
