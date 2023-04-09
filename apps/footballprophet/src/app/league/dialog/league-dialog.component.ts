import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { League } from '@footballprophet/domain';

@Component({
    selector: 'footballprophet-league-dialog',
    templateUrl: './league-dialog.component.html',
})
export class LeagueDialogComponent {
    public leagueForm: FormGroup = new FormGroup({});
    public model: League = {
        name: '',
        logoUrl: '',
        season: 0,
        teams: [],
        fixtures: [],
        createdAt: new Date(),
        updatedAt: new Date(),
    };

    constructor(
        private dialogRef: MatDialogRef<LeagueDialogComponent>,
        private fb: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data: League,
    ) {
        this.leagueForm = this.fb.group({
            name: ['', Validators.required],
            logoUrl: ['', Validators.required],
            season: [0, Validators.required],
        });

        if (data) this.model = data;
    }

    public Submit(): void {
        this.dialogRef.close(this.model);
    }
}
