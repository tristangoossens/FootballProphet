import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LeagueComponent } from './league/league.component';
import { InviteResolver } from './pool/invite/invite.resolver';
import { JoinComponent } from './pool/join/join-dialog.component';
import { PoolComponent } from './pool/pool.component';

const routes: Routes = [
  { path: 'leagues', pathMatch: 'full', component: LeagueComponent },

  // Pool route 
  { path: 'pools', pathMatch: 'full', component: PoolComponent },
  { path: 'pools/:poolId/invite/:joinCode', pathMatch: 'full', resolve: { canJoin: InviteResolver }, component: PoolComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
