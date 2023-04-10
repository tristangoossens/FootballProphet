import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Fixture, League, Team } from '@footballprophet/domain';
import mongoose, { mongo } from 'mongoose';

@Component({
  selector: 'footballprophet-fixture-create-dialog',
  templateUrl: './fixture-dialog.component.html',
  styleUrls: ['./fixture-dialog.component.scss'],
})
export class FixtureDialogComponent {
  public fixtureTeamForm: FormGroup = new FormGroup({});
  public fixtureInfoForm: FormGroup = new FormGroup({});
  public league: League;
  public today = new Date();
  public model: Fixture = {
    league: mongoose.Types.ObjectId.createFromHexString(
      '6391f781a9480c7b3fadeefd'
    ) as mongoose.Types.ObjectId,
    stadium: '',
    referee: '',
    kickOffDate: new Date(),
    homeTeam: {
      logoUrl: 'https://www.flashscore.com/res/image/empty-logo-team-share.gif',
    } as Team,
    awayTeam: {
      logoUrl: 'https://www.flashscore.com/res/image/empty-logo-team-share.gif',
    } as Team,
  };

  constructor(
    private dialogRef: MatDialogRef<FixtureDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { fixture?: Fixture; league: League }
  ) {
    this.fixtureTeamForm = this.fb.group({
      homeTeam: ['', Validators.required],
      awayTeam: ['', Validators.required],
    });

    this.fixtureInfoForm = this.fb.group({
      stadium: ['', Validators.required],
      referee: ['', Validators.required],
      kickOffDate: ['', Validators.required],
    });

    this.league = data.league as League;
    this.model.league = data.league._id as mongoose.Types.ObjectId;
    if (data.fixture) this.model = data.fixture;
  }

  public Submit(): void {
    this.dialogRef.close(this.model);
  }

  public CorrectKickOffDate(): boolean {
    // Kick off date should be at least 1 hour from now
    const now = new Date();
    const oneHourFromNow = new Date(now.getTime() + 60 * 60 * 1000);
    return this.model.kickOffDate > oneHourFromNow;
  }

  public AsTeamArray(): Team[] {
    return (this.model.league as League).teams as Team[];
  }
}
