import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValueCheckComponent } from './value-check.component';

describe('ValueCheckComponent', () => {
  let component: ValueCheckComponent;
  let fixture: ComponentFixture<ValueCheckComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ValueCheckComponent]
    });
    fixture = TestBed.createComponent(ValueCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
