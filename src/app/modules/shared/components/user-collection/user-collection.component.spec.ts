import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCollectionComponent } from './user-collection.component';

describe('UserCollectionComponent', () => {
  let component: UserCollectionComponent;
  let fixture: ComponentFixture<UserCollectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserCollectionComponent]
    });
    fixture = TestBed.createComponent(UserCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
