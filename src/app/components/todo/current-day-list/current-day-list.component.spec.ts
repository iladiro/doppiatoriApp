import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToDoCurrentDayListComponent } from './current-day-list.component';

describe('ToDoCurrentDayListComponent', () => {
  let component: ToDoCurrentDayListComponent;
  let fixture: ComponentFixture<ToDoCurrentDayListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToDoCurrentDayListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToDoCurrentDayListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
