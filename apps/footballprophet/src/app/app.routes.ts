import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { AboutComponent } from './pages/about/about.component';
import { HomeComponent } from './pages/home/home.component';
import { PlayerCreateComponent } from './pages/players/player-create/player-create.component';
import { PlayerDetailsComponent } from './pages/players/player-details/player-details.component';
import { PlayersComponent } from './pages/players/players.component';

const routes: Routes = [
    { path: '', pathMatch: 'full', component: HomeComponent },
    { path: 'about', pathMatch: 'full', component: AboutComponent },
    { path: 'players/new', pathMatch: 'full', component: PlayerCreateComponent},
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