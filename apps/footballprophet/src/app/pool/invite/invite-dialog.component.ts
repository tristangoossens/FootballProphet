import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Pool } from '@footballprophet/domain';
import { AlertService } from '../../shared/alert/alert.service';
import { PoolService } from '../pool.service';

@Component({
    selector: 'footballprophet-invite',
    templateUrl: './invite-dialog.component.html',
    styleUrls: ['./invite-dialog.component.scss'],
})
export class InviteComponent {
    constructor(private dialog: MatDialogRef<InviteComponent>, private poolService: PoolService, private alertService: AlertService, @Inject(MAT_DIALOG_DATA) public data: any) { }

    public JoinPool(id: string): void {
        this.poolService.JoinPool(id).subscribe(() => {
            this.alertService.AlertSuccess('You have successfully joined the pool');
            this.dialog.close();
        });
    }
}
