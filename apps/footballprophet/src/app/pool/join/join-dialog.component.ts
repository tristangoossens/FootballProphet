import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
    selector: 'footballprophet-join',
    templateUrl: './join-dialog.component.html',
    styleUrls: ['./join-dialog.component.scss'],
})
export class JoinComponent {
    constructor(private dialog: MatDialogRef<JoinComponent>, private router: Router) { }

    public JoinPool(): void {

    }
}
