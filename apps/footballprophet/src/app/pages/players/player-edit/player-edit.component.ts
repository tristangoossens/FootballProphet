import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Player, Position } from '@footballprophet/domain';
import { PlayerService } from '../../../services/player.service';

@Component({
  selector: 'footballprophet-player-edit',
  templateUrl: './player-edit.component.html',
  styleUrls: ['./player-edit.component.scss'],
})
export class PlayerEditComponent implements OnInit {
  player: Player | undefined;
  dateOfBirthString: string | undefined;
  positions = Object.values(Position);

  constructor(
    private playerService: PlayerService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const playerId = params.get('id')!;
      this.player = this.playerService.getPlayer(playerId);
      this.dateOfBirthString = this.player!.dateOfBirth.toISOString().split('T')[0];
    });
  }

  submitForm() {
    this.player!.dateOfBirth = new Date(this.dateOfBirthString!);
    this.player!.updatedAt = new Date();

    this.playerService.updatePlayer(this.player!);
    this.router.navigate(['/players']);
  }
}
