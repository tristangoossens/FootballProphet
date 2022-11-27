import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Player, Team } from '@footballprophet/domain';
import Swal from 'sweetalert2';
import { PlayerService } from '../../../services/player.service';
import { TeamService } from '../../../services/team.service';

@Component({
  selector: 'footballprophet-team-details',
  templateUrl: './team-details.component.html',
  styleUrls: ['./team-details.component.scss'],
})
export class TeamDetailsComponent implements OnInit {
  team: Team | undefined;
  playersInTeam: Player[] | undefined;

  constructor(
    private teamService: TeamService,
    private playerService: PlayerService,
    private currentRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentRoute.paramMap.subscribe((params) => {
      const teamId = params.get('id')!;
      this.team = this.teamService.getTeam(teamId);
      this.playersInTeam = this.playerService.getPlayersInTeam(teamId);
      console.log(this.playersInTeam);
    });
  }

  back(){
    this.router.navigate(['/teams']);
  }

  deletePlayer(playerId: string, teamId: string) {
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
        this.playersInTeam = this.playerService.getPlayersInTeam(teamId);

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
