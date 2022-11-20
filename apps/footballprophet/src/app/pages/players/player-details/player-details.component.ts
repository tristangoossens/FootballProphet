import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Player } from '@footballprophet/domain';
import { Subscription } from 'rxjs';
import { PlayerService } from '../../../services/player.service';

@Component({
  selector: 'footballprophet-player-details',
  templateUrl: './player-details.component.html',
  styleUrls: ['./player-details.component.scss'],
})
export class PlayerDetailsComponent implements OnInit {
  player: Player | undefined;

  constructor(
    private playerService: PlayerService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const playerId = params.get('id')!;
      console.log(playerId);
      this.player = this.playerService.getPlayer(playerId);
    });
  }
}
