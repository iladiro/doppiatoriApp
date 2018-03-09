import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DubbersListComponent } from './dubbers-list.component';

describe('DubbersListComponent', () => {
  let component: DubbersListComponent;
  let fixture: ComponentFixture<DubbersListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DubbersListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DubbersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
