import { Component, OnInit } from '@angular/core';
import { League } from '@footballprophet/domain';
import { AuthService } from '../auth/auth.service';
import { LeagueService } from './league.service';

@Component({
  selector: 'footballprophet-leagues',
  templateUrl: './leagues.component.html',
  styleUrls: ['./leagues.component.scss'],
})
export class LeaguesComponent implements OnInit {
  rows: any[] | undefined;
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;

  constructor(
    private leagueService: LeagueService,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.leagueService.list().subscribe((leagues) => {
      this.rows = leagues?.map(league => {
        return {
          league,
          isCollapsed: true
        };
      });
    });

    this.authService.isLoggedin$.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });

    this.authService.isAdmin$.subscribe((isAdmin) => {
      this.isAdmin = isAdmin;
    });
  }
}
