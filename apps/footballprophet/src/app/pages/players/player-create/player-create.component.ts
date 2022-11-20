import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Player, Position } from '@footballprophet/domain';
import { PlayerService } from '../../../services/player.service';

@Component({
  selector: 'footballprophet-player-create',
  templateUrl: './player-create.component.html',
  styleUrls: ['./player-create.component.scss'],
})
export class PlayerCreateComponent implements OnInit {
  player: Player | undefined;
  positions = Object.values(Position);

  constructor(
    private playerService: PlayerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.player = {
      id: '',
      name: '',
      dateOfBirth: new Date(0),
      position: Position.FW,
      nationality: '',
      photoUrl: '',
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  }

  submitForm() {
    this.player!.dateOfBirth = new Date(this.player!.dateOfBirth);
    this.player!.createdAt = new Date(this.player!.createdAt);
    this.player!.updatedAt = new Date(this.player!.updatedAt);

    this.playerService.addPlayer(this.player!);
    this.router.navigate(['/players']);
  }
}
