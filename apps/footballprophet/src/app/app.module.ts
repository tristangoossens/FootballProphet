import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavComponent } from './shared/nav/nav.component';
import { AppRoutingModule } from './app.routes';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AboutComponent } from './pages/about/about.component';
import { HomeComponent } from './pages/home/home.component';
import { PlayerService } from './services/player.service';
import { PlayersComponent } from './pages/players/players.component';
import { DetailsComponent } from './pages/players/player-details/player-details.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    AboutComponent,
    HomeComponent,
    PlayersComponent,
    DetailsComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, NgbModule],
  providers: [PlayerService],
  bootstrap: [AppComponent],
})
export class AppModule {}
