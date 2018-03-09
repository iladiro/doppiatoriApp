import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDubberComponent } from './add-dubber.component';

describe('AddDubberComponent', () => {
  let component: AddDubberComponent;
  let fixture: ComponentFixture<AddDubberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDubberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDubberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
