import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { League, User } from '@footballprophet/domain';
import { AuthService } from '../auth/auth.service';
import { AlertService } from '../shared/alert/alert.service';
import { LeagueDialogComponent } from './dialog/league-dialog.component';
import { LeagueService } from './league.service';

@Component({
  selector: 'footballprophet-league',
  templateUrl: './league.component.html',
  styleUrls: ['./league.component.scss'],
})
export class LeagueComponent implements OnInit {
  public loggedInUser?: User;
  public leagues: League[] = [];
  public isLoading: boolean = false;

  constructor(
    private leagueService: LeagueService,
    private authService: AuthService,
    private alertService: AlertService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe((user) => {
      this.loggedInUser = user;
    });

    this.LoadLeagues();
  }

  LoadLeagues(): void {
    this.isLoading = true;
    // Set a timeout to simulate a slow connection
    setTimeout(() => {
      this.leagueService.GetLeagues(0, 10).subscribe((leagues) => {
        this.leagues = leagues;
        this.isLoading = false;
      });
    }, 500);
  }

  public OpenLeagueCreateDialog(): void {
    this.dialog
      .open(LeagueDialogComponent)
      .afterClosed()
      .subscribe((league: League) => {
        if (league) {
          this.leagueService.CreateLeague(league).subscribe(
            (_) => {
              this.alertService.AlertSuccess('League created successfully');
              this.LoadLeagues();
            },
            (error) => {
              this.alertService.AlertError(error.message);
            }
          );
        }
      });
  }
}
