import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Team } from '@footballprophet/domain';

@Component({
  selector: 'footballprophet-dialog',
  templateUrl: './team-dialog.component.html',
})
export class TeamDialogComponent {
  public teamForm: FormGroup = new FormGroup({});
  public model: Team = {
    name: '',
    logoUrl: '',
    foundedIn: new Date(),
  };

  constructor(
    private dialogRef: MatDialogRef<TeamDialogComponent>,
    private fb: FormBuilder
  ) {
    this.teamForm = this.fb.group({
      name: ['', Validators.required],
      logoUrl: ['', Validators.required],
      foundedIn: ['', Validators.required],
    });
  }

  public Submit(): void {
    this.dialogRef.close(this.model);
  }
}
