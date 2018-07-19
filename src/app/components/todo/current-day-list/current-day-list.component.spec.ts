import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentDayListComponent } from './current-day-list.component';

describe('CurrentDayListComponent', () => {
  let component: CurrentDayListComponent;
  let fixture: ComponentFixture<CurrentDayListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentDayListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentDayListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
