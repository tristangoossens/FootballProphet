import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Fixture, HalfTimeScore, Prediction } from '@footballprophet/domain';
import mongoose from 'mongoose';


@Component({
  selector: 'footballprophet-prediction-dialog',
  templateUrl: './prediction-dialog.component.html',
})
export class PredictionDialog {
  public predictionHalfTimeForm: FormGroup = new FormGroup({});
  public predictionFullTimeForm: FormGroup = new FormGroup({});
  public model: Prediction = {
    fixture: mongoose.Types.ObjectId.createFromHexString('6429f6332328d6d67c45f306') as mongoose.Types.ObjectId,
    predictedAwayScore: 0,
    predictedHomeScore: 0,
    predictedHalfTimeScore: HalfTimeScore.TIED,
  };
  public enumKeys: string[] = Object.values(HalfTimeScore);

  constructor(
    private dialogRef: MatDialogRef<PredictionDialog>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { fixture: Fixture, prediction?: Prediction }
  ) {
    this.predictionHalfTimeForm = this.fb.group({
      predictedHalfTimeScore: ['', Validators.required],
    });

    this.predictionFullTimeForm = this.fb.group({
      predictedHomeScore: ['', Validators.required],
      predictedAwayScore: ['', Validators.required],
    });

    this.model.fixture = data.fixture._id as mongoose.Types.ObjectId;
    if (data.prediction) this.model = data.prediction;
  }

  public Submit(): void {
    console.log(this.model)
    this.dialogRef.close(this.model);
  }
}
