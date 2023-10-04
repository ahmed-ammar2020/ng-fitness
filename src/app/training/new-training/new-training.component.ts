import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Exercise } from '../interfaces/exercise';
import { inject } from '@angular/core';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css'],
})
export class NewTrainingComponent {
  exercises$: Observable<any>;
  firestore: Firestore = inject(Firestore);
  selectedExercise: Exercise | undefined;

  trainForm = new FormGroup({
    selectedTraining: new FormControl('', [Validators.required]),
  });

  constructor(private router: Router, private store: Firestore) {}

  ngOnInit() {
    const exercises = collection(this.firestore, 'exercises');
    this.exercises$ = collectionData(exercises, { idField: 'id' });
  }

  submitForm() {
    this.exercises$.pipe(tap()).subscribe((exercises: Exercise[]) => {
      this.selectedExercise = exercises.find(
        (exercise: Exercise) =>
          exercise.id === this.trainForm.value.selectedTraining
      );

      this.router.navigateByUrl('/training/current-training', {
        state: { currentExercise: this.selectedExercise },
      });
    });
  }
}
