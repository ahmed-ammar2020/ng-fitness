import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrainingHomeComponent } from './training-home/training-home.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { PastTrainingsComponent } from './past-trainings/past-trainings.component';
import { CurrentTrainingComponent } from './current-training/current-training.component';

const routes: Routes = [
  {
    path: '',
    component: TrainingHomeComponent,
    // router-outlet is the child routes
    children: [
      {
        path: 'new-training',
        component: NewTrainingComponent,
      },
      {
        path: 'past-trainings',
        component: PastTrainingsComponent,
      },
      {
        path: 'current-training',
        component: CurrentTrainingComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrainingRoutingModule {}
