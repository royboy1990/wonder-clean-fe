import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoDoneComponent } from './video-done.component';

describe('VideoDoneComponent', () => {
  let component: VideoDoneComponent;
  let fixture: ComponentFixture<VideoDoneComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VideoDoneComponent]
    });
    fixture = TestBed.createComponent(VideoDoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
