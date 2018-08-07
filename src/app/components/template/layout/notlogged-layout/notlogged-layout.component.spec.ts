import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotloggedLayoutComponent } from './notlogged-layout.component';

describe('NotloggedLayoutComponent', () => {
  let component: NotloggedLayoutComponent;
  let fixture: ComponentFixture<NotloggedLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotloggedLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotloggedLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
