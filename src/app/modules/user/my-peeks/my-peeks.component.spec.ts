import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPeeksComponent } from './my-peeks.component';

describe('MyPeeksComponent', () => {
  let component: MyPeeksComponent;
  let fixture: ComponentFixture<MyPeeksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyPeeksComponent]
    });
    fixture = TestBed.createComponent(MyPeeksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
