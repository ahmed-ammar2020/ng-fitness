import { Component, ViewChild, inject } from '@angular/core';
import { Exercise } from '../interfaces/exercise';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.css'],
})
export class PastTrainingsComponent {
  dataSource = new MatTableDataSource<Exercise>();
  displayedColumns = ['date', 'name', 'calories', 'duration', 'state'];
  finishedExercises$: Observable<any>;
  firestore: Firestore = inject(Firestore);
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  userId: string;

  constructor(private auth: Auth) {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        const uid = user.uid;
        this.userId = uid;
        const finishedExercises = collection(
          this.firestore,
          `finishedExercises/${this.userId}/userFinishedExercises`
        );
        this.finishedExercises$ = collectionData(finishedExercises);

        this.finishedExercises$.subscribe((exercises) => {
          for (let exercise of exercises) {
            exercise.date = new Date(exercise.date.seconds * 1000);
          }
          this.dataSource.data = exercises;
          setTimeout(() => {
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
          });
        });
      } else {
        // User is signed out
      }
    });
  }

  ngOnInit() {}

  ngAfterViewInit() {}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
