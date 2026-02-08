import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicStatusComponent } from './public-status.component';

describe('PublicStatusComponent', () => {
  let component: PublicStatusComponent;
  let fixture: ComponentFixture<PublicStatusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PublicStatusComponent]
    });
    fixture = TestBed.createComponent(PublicStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
