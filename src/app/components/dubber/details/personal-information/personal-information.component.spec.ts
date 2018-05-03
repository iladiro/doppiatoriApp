import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DubberPersonalInformationComponent } from './edit-form.component';

describe('DubberPersonalInformationComponent', () => {
  let component: DubberPersonalInformationComponent;
  let fixture: ComponentFixture<DubberPersonalInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DubberPersonalInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DubberPersonalInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
