import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Team } from '@footballprophet/domain';
import Swal from 'sweetalert2';
import { TeamService } from '../../../services/team.service';

@Component({
  selector: 'footballprophet-team-edit',
  templateUrl: './team-edit.component.html',
  styleUrls: ['./team-edit.component.scss'],
})
export class TeamEditComponent implements OnInit {
  team: Team | undefined;
  foundedInString: string | undefined;

  constructor(
    private teamService: TeamService,
    private currentRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentRoute.paramMap.subscribe((params) => {
      const teamId = params.get('id')!;
      this.team = this.teamService.getTeam(teamId);
      this.foundedInString = this.team!.foundedIn.toISOString().split('T')[0];
    });
  }

  submitForm() {
    this.team!.foundedIn = new Date(this.foundedInString!);
    this.team!.updatedAt = new Date();
    this.teamService.updateTeam(this.team!);
    this.router.navigate(['/teams']);

    Swal.fire({
      title: 'Gewijzigd',
      text: `Team met id "${this.team!.id}" is gewijzigd!`,
      icon: 'success',
      confirmButtonColor: '#001E28',
      confirmButtonText: 'OK',
    });
  }
}
