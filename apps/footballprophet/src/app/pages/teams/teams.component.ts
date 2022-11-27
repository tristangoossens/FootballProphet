import { Component, OnInit } from '@angular/core';
import { Team } from '@footballprophet/domain';
import Swal from 'sweetalert2';
import { TeamService } from '../../services/team.service';

@Component({
  selector: 'footballprophet-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss'],
})
export class TeamsComponent implements OnInit {
  teams: Team[] | undefined;

  constructor(private teamService: TeamService) {}

  ngOnInit(): void {
    this.teams = this.teamService.getTeams();
  }

  deleteTeam(teamId: string) {
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
        this.teamService.deleteTeam(teamId);
        this.teams = this.teamService.getTeams();

        Swal.fire({
          title: 'Verwijderd',
          text: `Team met id "${teamId}" is verwijderd!`,
          icon: 'success',
          confirmButtonColor: '#001E28',
          confirmButtonText: 'OK',
        });
      }
    });
  }
}
