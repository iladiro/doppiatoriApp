import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IconsNavComponent } from './icons-nav.component';

describe('IconsNavComponent', () => {
  let component: IconsNavComponent;
  let fixture: ComponentFixture<IconsNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IconsNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconsNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
