import { Component, OnInit } from '@angular/core';
import { Player } from '@footballprophet/domain';
import { PlayerService } from '../../services/player.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'footballprophet-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss'],
})
export class PlayersComponent implements OnInit {
  players: Player[] | undefined;

  constructor(private playerService: PlayerService) {}

  ngOnInit(): void {
    this.players = this.playerService.getPlayers();
  }

  DeletePlayer(playerId: string) {
    Swal.fire({
      title: 'Weet je het zeker?',
      text: 'Je kunt deze actie niet ongedaan maken!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#FF0000',
      cancelButtonColor: '#001E28',
      confirmButtonText: 'Verwijderen',
      cancelButtonText: 'Annuleren',
    }).then((result) => {
      if (result.isConfirmed) {
        this.playerService.deletePlayer(playerId);
        this.players = this.playerService.getPlayers();

        Swal.fire({
          title: 'Verwijderd',
          text: `Speler met id "${playerId}" is verwijderd!`,
          icon: 'success',
          confirmButtonColor: '#001E28',
          confirmButtonText: 'OK',
        });
      }
    });
  }
}
