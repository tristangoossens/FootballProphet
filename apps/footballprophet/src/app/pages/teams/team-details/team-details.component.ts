import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Player, Team } from '@footballprophet/domain';
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
}
