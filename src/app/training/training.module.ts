import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from "@angular/forms";

import { TrainingRoutingModule } from './training-routing.module';
import { PastTrainingsComponent } from './past-trainings/past-trainings.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { TrainingHomeComponent } from './training-home/training-home.component';
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { CLoseTrainingDialogComponent } from './close-training-dialog/close-training-dialog.component';

@NgModule({
  declarations: [
    PastTrainingsComponent,
    NewTrainingComponent,
    TrainingHomeComponent,
    CurrentTrainingComponent,
    CLoseTrainingDialogComponent,
  ],
  imports: [
    CommonModule,
    TrainingRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule
  ],
})
export class TrainingModule {}
