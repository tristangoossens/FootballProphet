import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Fixture, HalfTimeScore } from '@footballprophet/domain';
import mongoose, { mongo } from 'mongoose';

@Component({
  selector: 'footballprophet-fixture-create-dialog',
  templateUrl: './fixture-score-dialog.component.html',
})
export class FixtureScoreDialogComponent {
  public fixtureHalfTimeScoreForm: FormGroup = new FormGroup({});
  public fixtureFullTimeScoreForm: FormGroup = new FormGroup({});
  public model: Fixture;
  public enumKeys: string[] = Object.keys(HalfTimeScore);

  constructor(
    private dialogRef: MatDialogRef<FixtureScoreDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: Fixture
  ) {
    this.fixtureHalfTimeScoreForm = this.fb.group({
      actualHalfTimeScore: ['', Validators.required],
    });

    this.fixtureFullTimeScoreForm = this.fb.group({
      actualHomeScore: ['', Validators.required],
      actualAwayScore: ['', Validators.required],
    });

    this.model = data;
  }

  public Submit(): void {
    this.dialogRef.close(this.model);
  }
}
