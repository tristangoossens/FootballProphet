import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { League, Pool, User } from '@footballprophet/domain';
import { LeagueService } from '../../league/league.service';
import { v4 as uuidv4 } from 'uuid';
import mongoose, { ObjectId } from 'mongoose';

@Component({
  selector: 'footballprophet-pool-dialog',
  templateUrl: './pool-dialog.component.html',
  styleUrls: ['./pool-dialog.component.scss'],
})
export class PoolDialogComponent implements OnInit {
  public poolForm: FormGroup = new FormGroup({});
  public leagues: League[] = [];
  public model: Pool;

  constructor(
    public dialogRef: MatDialogRef<PoolDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { pool: Pool, user: User },
    private fb: FormBuilder,
    private leagueService: LeagueService
  ) {
    this.poolForm = this.fb.group({
      league: ['', Validators.required],
      name: ['', Validators.required],
      logoUrl: ['', [Validators.required]],
      description: ['', [Validators.required]],
      isPrivate: [false, [Validators.required]],
    });

    if (data.pool) {
      this.model = data.pool;
    } else {
      this.model = {
        league: mongoose.Types.ObjectId.createFromHexString('6429f6332328d6d67c45f306') as mongoose.Types.ObjectId,
        name: '',
        logoUrl: '',
        description: '',
        isPrivate: false,
        joinCode: uuidv4(),
        members: [data.user._id as mongoose.Types.ObjectId],
        owner: data.user._id as mongoose.Types.ObjectId,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    }
  }

  ngOnInit(): void {
    this.leagueService.GetLeagues(0, 100).subscribe((leagues) => {
      this.leagues = leagues;
    });
  }

  public Submit(): void {
    // Add a timeout to simulate a slow connection
    this.dialogRef.close(this.model);
  }
}
