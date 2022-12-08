import { Component, OnInit } from '@angular/core';
import { League } from '@footballprophet/domain';
import { LeagueService } from './league.service';

@Component({
  selector: 'footballprophet-leagues',
  templateUrl: './leagues.component.html',
  styleUrls: ['./leagues.component.scss'],
})
export class LeaguesComponent implements OnInit {
  leagues: League[] | undefined;

  constructor(
    private leagueService: LeagueService
  ) { }

  ngOnInit(): void {
    this.leagueService.list().subscribe((leagues) => {
      this.leagues = leagues;
    });
  }
}
