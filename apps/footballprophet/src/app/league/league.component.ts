import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { League, User, UserRole } from '@footballprophet/domain';
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
  public isAdmin: boolean = false;
  public leagues: League[] = [];
  public isLoading: boolean = false;

  // Page
  public pageSize: number = 10;
  public currentPage: number = 0;

  constructor(
    private leagueService: LeagueService,
    private authService: AuthService,
    private alertService: AlertService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe((user) => {
      if (user) {
        // Check if the admin role (string) is present
        this.isAdmin = user.roles.includes(UserRole.Admin);
        this.loggedInUser = user;
      }
    });

    this.LoadLeagues();
  }

  LoadLeagues(): void {
    this.isLoading = true;
    this.leagueService
      .GetLeagues(this.currentPage * this.pageSize, this.pageSize)
      .subscribe(
        (leagues) => {
          this.leagues = [...this.leagues, ...leagues];
          this.currentPage++;
          this.isLoading = false;
        },
        (error) => {
          this.alertService.AlertError(error.message);
          this.isLoading = false;
        }
      );
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
