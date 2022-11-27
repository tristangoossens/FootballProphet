import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { AboutComponent } from './pages/about/about.component';
import { HomeComponent } from './pages/home/home.component';
import { PlayerCreateComponent } from './pages/players/player-create/player-create.component';
import { PlayerDetailsComponent } from './pages/players/player-details/player-details.component';
import { PlayerEditComponent } from './pages/players/player-edit/player-edit.component';
import { PlayersComponent } from './pages/players/players.component';
import { TeamCreateComponent } from './pages/teams/team-create/team-create.component';
import { TeamDetailsComponent } from './pages/teams/team-details/team-details.component';
import { TeamEditComponent } from './pages/teams/team-edit/team-edit.component';
import { TeamsComponent } from './pages/teams/teams.component';

const routes: Routes = [
    { path: '', pathMatch: 'full', component: HomeComponent },
    { path: 'about', pathMatch: 'full', component: AboutComponent },
    { path: 'players/new', pathMatch: 'full', component: PlayerCreateComponent},
    { path: 'players/:id/edit', pathMatch: 'full', component: PlayerEditComponent},
    { 
        path: 'players',
        component: PlayersComponent,
        children: [
            {
                path: ':id',
                pathMatch: 'full',
                component: PlayerDetailsComponent
            }
        ]
    },
    { path: 'teams/new', pathMatch: 'full', component: TeamCreateComponent },
    { path: 'teams/:id/edit', pathMatch: 'full', component: TeamEditComponent},
    { 
        path: 'teams', 
        component: TeamsComponent,
        children: [
            {
                path: ':id',
                pathMatch: 'full',
                component: TeamDetailsComponent
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
        scrollPositionRestoration: 'enabled',
        }),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}