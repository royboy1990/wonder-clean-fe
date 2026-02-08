import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCollectionComponent } from './my-collection.component';

describe('MeComponent', () => {
  let component: MyCollectionComponent;
  let fixture: ComponentFixture<MyCollectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyCollectionComponent]
    });
    fixture = TestBed.createComponent(MyCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
