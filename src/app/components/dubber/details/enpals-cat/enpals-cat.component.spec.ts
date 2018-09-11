import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnpalsCatComponent } from './enpals-cat.component';

describe('EnpalsCatComponent', () => {
  let component: EnpalsCatComponent;
  let fixture: ComponentFixture<EnpalsCatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnpalsCatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnpalsCatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
