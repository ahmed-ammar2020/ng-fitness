import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingHomeComponent } from './training-home.component';

describe('TrainingHomeComponent', () => {
  let component: TrainingHomeComponent;
  let fixture: ComponentFixture<TrainingHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrainingHomeComponent]
    });
    fixture = TestBed.createComponent(TrainingHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
