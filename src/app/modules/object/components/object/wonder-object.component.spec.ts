import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WonderObjectComponent } from './wonder-object.component';

describe('ObjectComponent', () => {
  let component: WonderObjectComponent;
  let fixture: ComponentFixture<WonderObjectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WonderObjectComponent]
    });
    fixture = TestBed.createComponent(WonderObjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
