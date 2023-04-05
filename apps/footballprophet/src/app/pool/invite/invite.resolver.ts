import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { PoolService } from '../pool.service';
import { InviteComponent } from './invite-dialog.component';

// @Injectable()
// export class InviteResolver {
//   constructor(private router: Router, private poolService: PoolService) { }

//   resolve(): Promise<boolean> {
//     return new Promise(resolve => {
//       this.router.events
//         .pipe(
//           filter(event => event instanceof NavigationEnd),
//           take(1)
//         )
//         .subscribe(() => {
//           // Retrieve the join code from the url (url is /pool/:poolId/invite/:inviteCode)
//           const joinCode = this.router.url.split('/')[3];
//           const poolId = this.router.url.split('/')[2];

//           console.log(joinCode);
//           console.log(poolId);

//           // Get the pool by id
//           this.poolService.GetPoolById(poolId).subscribe(pool => {
//             console.log(pool);
//             // If the invite code matches the pool's invite code, resolve the promise
//             if (pool.joinCode === joinCode) {
//               // TODO: Redirect to join pool page
//               resolve(true);
//             } else {
//               // Otherwise, redirect to the home page
//               // this.router.navigate(['/']);
//               resolve(false);
//             }
//           });
//         });
//     });
//   }
// }

// import { Injectable } from '@angular/core';
// import { Resolve } from '@angular/router';
// import { MyDataService } from './my-data.service'; // Replace with your data service

@Injectable()
export class InviteResolver implements Resolve<any> {
  constructor(private router: Router, private poolService: PoolService, private matDialog: MatDialog) { } // Replace with your data service

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // Retrieve the join code from the activated route (url is /pool/:poolId/invite/:inviteCode)
    const joinCode = route.paramMap.get('joinCode');
    const poolId = route.paramMap.get('poolId');

    // Get the pool by id
    this.poolService.GetPoolById(poolId!).subscribe(pool => {
      this.matDialog.open(InviteComponent, { disableClose: true, data: { pool: pool } });
      // If the invite code matches the pool's invite code, resolve the promise
      return pool.joinCode === joinCode;
    });
  }
}