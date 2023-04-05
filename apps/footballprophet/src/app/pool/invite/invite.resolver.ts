import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { PoolService } from '../pool.service';
import { DialogComponent } from '../../shared/dialog/dialog.component';
import { AlertService } from '../../shared/alert/alert.service';

@Injectable()
export class InviteResolver implements Resolve<any> {
  constructor(
    private router: Router,
    private poolService: PoolService,
    private alertSerivce: AlertService,
    private matDialog: MatDialog
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // Retrieve the join code from the activated route (url is /pool/:poolId/invite/:inviteCode)
    const joinCode = route.paramMap.get('joinCode');
    const poolId = route.paramMap.get('poolId')!.toString();

    // Get the pool by id
    this.poolService.GetPoolById(poolId!).subscribe((pool) => {
      // If the join code is not valid, redirect to the pool details page
      if (pool.joinCode !== joinCode) {
        this.router.navigate(['/']);
        this.alertSerivce.AlertError(`The join code is not valid. Try again.`);
        return;
      }

      const dialogRef = this.matDialog.open(DialogComponent, {
        disableClose: true,
        data: {
          imageUrl: pool.logoUrl,
          title: 'Pool Invite',
          message: `You have been invited to join the pool ${pool.name}!`,
          method: 'Join',
        },
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.poolService.JoinPool(poolId!).subscribe(() => {
            this.alertSerivce.AlertSuccess(
              `You have successfully joined the pool!`
            );
          });
        }
      });
    });
  }
}
