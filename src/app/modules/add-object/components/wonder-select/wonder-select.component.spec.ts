import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WonderSelectComponent } from './wonder-select.component';

describe('WonderSelectComponent', () => {
  let component: WonderSelectComponent;
  let fixture: ComponentFixture<WonderSelectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WonderSelectComponent]
    });
    fixture = TestBed.createComponent(WonderSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
