import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CLoseTrainingDialogComponent } from './close-training-dialog.component';

describe('CLoseTrainingDialogComponent', () => {
  let component: CLoseTrainingDialogComponent;
  let fixture: ComponentFixture<CLoseTrainingDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CLoseTrainingDialogComponent]
    });
    fixture = TestBed.createComponent(CLoseTrainingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
