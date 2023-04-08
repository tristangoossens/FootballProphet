import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LeagueComponent } from './league/league.component';
import { InviteResolver } from './pool/invite/invite.resolver';
import { PoolComponent } from './pool/pool.component';
import { PoolDetailComponent } from './pool/details/pool-details.component';
import { LeagueDetailComponent } from './league/details/league-details.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  // Home route
  { path: '', pathMatch: 'full', component: HomeComponent },

  // User profile route
  { path: 'dashboard', pathMatch: 'full', component: DashboardComponent },

  // League routes
  { path: 'leagues', pathMatch: 'full', component: LeagueComponent },
  {
    path: 'leagues/:leagueId',
    pathMatch: 'full',
    component: LeagueDetailComponent,
  },

  // Pool routes
  { path: 'pools', pathMatch: 'full', component: PoolComponent },
  { path: 'pools/:poolId', pathMatch: 'full', component: PoolDetailComponent },
  {
    path: 'pools/:poolId/invite/:joinCode',
    pathMatch: 'full',
    resolve: { canJoin: InviteResolver },
    component: PoolComponent,
  },
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
