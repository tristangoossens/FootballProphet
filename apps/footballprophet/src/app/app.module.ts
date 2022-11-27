import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavComponent } from './shared/nav/nav.component';
import { AppRoutingModule } from './app.routes';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

import { AboutComponent } from './pages/about/about.component';
import { HomeComponent } from './pages/home/home.component';
import { PlayerService } from './services/player.service';
import { PlayersComponent } from './pages/players/players.component';
import { PlayerDetailsComponent } from './pages/players/player-details/player-details.component';
import { PlayerCreateComponent } from './pages/players/player-create/player-create.component';
import { PlayerEditComponent } from './pages/players/player-edit/player-edit.component';
import { TeamsComponent } from './pages/teams/teams.component';
import { TeamService } from './services/team.service';
import { TeamCreateComponent } from './pages/teams/team-create/team-create.component';
import { TeamEditComponent } from './pages/teams/team-edit/team-edit.component';
import { TeamDetailsComponent } from './pages/teams/team-details/team-details.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    AboutComponent,
    HomeComponent,
    PlayersComponent,
    PlayerDetailsComponent,
    PlayerCreateComponent,
    PlayerEditComponent,
    TeamsComponent,
    TeamCreateComponent,
    TeamEditComponent,
    TeamDetailsComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, NgbModule, FormsModule],
  providers: [PlayerService, TeamService],
  bootstrap: [AppComponent],
})
export class AppModule {}
