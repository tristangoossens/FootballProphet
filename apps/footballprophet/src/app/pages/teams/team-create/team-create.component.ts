import { Component, OnInit } from '@angular/core';
import { Team } from '@footballprophet/domain';
import { TeamService } from '../../../services/team.service';
import { v4 as uuidv4 } from 'uuid';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'footballprophet-team-create',
  templateUrl: './team-create.component.html',
  styleUrls: ['./team-create.component.scss'],
})
export class TeamCreateComponent implements OnInit {
  team: Team | undefined;

  constructor(
    private teamService: TeamService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.team = {
      id: uuidv4(),
      name: '',
      logoUrl: '',
      foundedIn: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  }

  submitForm() {
    this.team!.foundedIn = new Date(this.team!.foundedIn);
    this.team!.createdAt = new Date(this.team!.createdAt);
    this.team!.updatedAt = new Date(this.team!.updatedAt);

    this.teamService.addTeam(this.team!);
    this.router.navigate(['/teams']);

    Swal.fire({
      title: 'Toegevoegd',
      text: `Team met id "${this.team!.id}" is toegevoegd!`,
      icon: 'success',
      confirmButtonColor: '#001E28',
      confirmButtonText: 'OK',
    });
  }
}
