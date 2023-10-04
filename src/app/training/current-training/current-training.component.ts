import { Component, inject } from '@angular/core';
import { CLoseTrainingDialogComponent } from '../close-training-dialog/close-training-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Exercise } from '../interfaces/exercise';
import {
  Firestore,
  CollectionReference,
  addDoc,
  collection,
  doc,
} from '@angular/fire/firestore';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css'],
})
export class CurrentTrainingComponent {
  progressValue = 0;
  timerId: any;
  currentExercise: Exercise;
  finishedExercies: CollectionReference;
  userFinishedExercises: CollectionReference;
  firestore: Firestore = inject(Firestore);
  userId: string;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private auth: Auth
  ) {
    this.finishedExercies = collection(this.firestore, 'finishedExercises');
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        const uid = user.uid;
        this.userId = uid;

        // create a document for each user by their id
        doc(this.firestore, `finishedExercises/${this.userId}`);
      } else {
        // User is signed out
      }
    });
  }

  ngOnInit() {
    //  recieving the data sent via the router
    this.currentExercise = history.state.currentExercise;
    this.startTraining();
  }

  startTraining() {
    this.timerId = setInterval(() => {
      this.progressValue += 1;

      // the exercicse is completed
      if (this.progressValue === 100) {
        clearInterval(this.timerId);

        this.userFinishedExercises = collection(
          this.firestore,
          `finishedExercises/${this.userId}/userFinishedExercises`
        );

        addDoc(this.userFinishedExercises, {
          ...this.currentExercise,
          date: new Date(),
          state: 'completed',
        });
        this.router.navigateByUrl('/training/past-trainings');
      }
    }, (this.currentExercise.duration * 1000) / 100);
  }

  // stop the exercise
  stopTraining() {
    const dialogRef = this.dialog.open(CLoseTrainingDialogComponent, {
      data: {
        progress: this.progressValue,
      },
    });
    clearInterval(this.timerId);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.userFinishedExercises = collection(
          this.firestore,
          `finishedExercises/${this.userId}/userFinishedExercises`
        );
        // cancel the exercise
        addDoc(this.userFinishedExercises, <Exercise>{
          ...this.currentExercise,
          date: new Date(),
          state: 'cancelled',
          duration: this.currentExercise.duration * (this.progressValue / 100),
          calories: this.currentExercise.calories * (this.progressValue / 100),
        });

        this.router.navigateByUrl('/training/past-trainings');

        return;
      }
      this.startTraining();
    });
  }
}
