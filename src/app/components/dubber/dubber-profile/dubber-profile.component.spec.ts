import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DubberProfileComponent } from './dubber-profile.component';

describe('DubberProfileComponent', () => {
  let component: DubberProfileComponent;
  let fixture: ComponentFixture<DubberProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DubberProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DubberProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
