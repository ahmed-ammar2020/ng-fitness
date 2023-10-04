import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

interface RecievedData {
  progress: number;
}

@Component({
  selector: 'app-close-training-dialog',
  templateUrl: './close-training-dialog.component.html',
  styleUrls: ['./close-training-dialog.component.css'],
})
export class CLoseTrainingDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public recievedData: RecievedData) {
    this.recievedData = recievedData;
  }
}
