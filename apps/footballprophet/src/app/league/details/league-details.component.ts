import { Component, OnInit } from '@angular/core';
import {
  Fixture,
  League,
  Prediction,
  Team,
  User,
  UserRole,
} from '@footballprophet/domain';
import { AlertService } from '../../shared/alert/alert.service';
import { LeagueService } from '../league.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { LeagueDialogComponent } from '../dialog/league-dialog.component';
import { FixtureDialogComponent } from '../../fixture/dialog/create/fixture-dialog.component';
import { FixtureService } from '../../fixture/fixture.service';
import { TeamDialogComponent } from '../../team/dialog/team-dialog.component';
import { FixtureScoreDialogComponent } from '../../fixture/dialog/score/fixture-score-dialog.component';
import { PredictionService } from '../../prediction/prediction.service';
import { PredictionDialog } from '../../prediction/dialog/prediction-dialog.component';

@Component({
  selector: 'footballprophet-league-details',
  templateUrl: './league-details.component.html',
  styleUrls: ['./league-details.component.scss'],
})
export class LeagueDetailComponent implements OnInit {
  public loggedInUser?: User;
  public isAdmin: boolean = false;
  public isLoading: boolean = false;
  public finishedGames: boolean = false;
  public league: League = {} as League;
  public filteredFixtures: Fixture[] = [];
  public displayedColumns: string[] = ['logoUrl', 'name', 'foundedIn'];

  constructor(
    private leagueService: LeagueService,
    private alertService: AlertService,
    public authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private fixtureService: FixtureService,
    private predictionService: PredictionService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.LoadCurrentUser();

    this.activatedRoute.paramMap.subscribe((params) => {
      const id = params.get('leagueId');
      if (id) {
        this.LoadLeague(id);
      }
    });
  }

  OpenEditLeagueDialog(): void {
    const dialogRef = this.dialog.open(LeagueDialogComponent, {
      data: Object.assign({}, this.league),
    });
    dialogRef.afterClosed().subscribe((result: League) => {
      if (result) {
        this.leagueService.UpdateLeague(result).subscribe(
          (_) => {
            this.alertService.AlertSuccess('League updated');
            this.LoadLeague(this.league._id!.toString());
          },
          (error) => {
            this.alertService.AlertError(error.message);
          }
        );
      }
    });
  }

  OpenCreateFixtureDialog(): void {
    const dialogRef = this.dialog.open(FixtureDialogComponent, {
      data: {
        league: Object.assign({}, this.league),
      },
    });
    dialogRef.afterClosed().subscribe((result: Fixture) => {
      if (result) {
        this.alertService.AlertSuccess('Fixture created');
        this.fixtureService.CreateFixure(result).subscribe(
          (_) => {
            this.alertService.AlertSuccess('League updated');
            this.LoadLeague(this.league._id!.toString());
          },
          (error) => {
            this.alertService.AlertError(error.message);
          }
        );
      }
    });
  }

  OpenCreateTeamDialog(): void {
    const dialogRef = this.dialog.open(TeamDialogComponent);
    dialogRef.afterClosed().subscribe((result: Team) => {
      if (result) {
        const leagueId = this.league._id!.toString();

        this.leagueService.AddTeamToLeague(leagueId, result).subscribe(
          (_) => {
            this.alertService.AlertSuccess('Team added to league');
            this.LoadLeague(this.league._id!.toString());
          },
          (error) => {
            this.alertService.AlertError(error.message);
          }
        );
      }
    });
  }

  OpenFixtureScoreDialog(fixture: Fixture): void {
    const dialogRef = this.dialog.open(FixtureScoreDialogComponent, {
      data: Object.assign({}, fixture),
    });

    dialogRef.afterClosed().subscribe((result: Fixture) => {
      if (result) {
        this.fixtureService.UpdateFixture(result).subscribe(
          (_) => {
            this.alertService.AlertSuccess('Final score for fixture set');
            this.LoadLeague(this.league._id!.toString());
          },
          (error) => {
            this.alertService.AlertError(error.message);
          }
        );
      }
    });
  }

  OpenCreatePredictionDialog(fixture: Fixture): void {
    const dialogRef = this.dialog.open(PredictionDialog, {
      data: {
        fixture: Object.assign({}, fixture),
      },
    });

    dialogRef.afterClosed().subscribe((result: Prediction) => {
      if (result) {
        this.predictionService.CreatePrediction(result).subscribe(
          (_) => {
            this.alertService.AlertSuccess('Successfully created prediction');
            this.LoadCurrentUser();
            this.LoadLeague(this.league._id?.toString() as string);
          },
          (error) => {
            this.alertService.AlertError(error.message);
          }
        );
      }
    });
  }

  OnChipSelectionChange(): void {
    this.finishedGames = !this.finishedGames;
    this.FilterFixtures();
  }

  FilterFixtures(): void {
    this.filteredFixtures = (this.league.fixtures as Fixture[]).filter((f) => {
      const now = new Date();
      const kickOff = new Date(f.kickOffDate);
      const diff = kickOff.getTime() - now.getTime();
      const diffHours = Math.ceil(diff / (1000 * 60 * 60));

      if (this.finishedGames) {
        // Return all fixtures that are finished (date in the past)
        return diffHours < 0;
      } else {
        // Return all fixtures that are not finished (date in the future)
        return diffHours > 0;
      }
    });
  }

  LoadLeague(id: string): void {
    this.isLoading = true;
    this.leagueService.GetLeagueById(id).subscribe(
      (league: League) => {
        this.league = league;
        this.FilterFixtures();
        this.isLoading = false;
      },
      (error) => {
        this.isLoading = false;
        this.alertService.AlertError(error.message);
      }
    );
  }

  LoadCurrentUser(): void {
    this.authService.currentUser$.subscribe((user) => {
      if (user) {
        this.isAdmin = user.roles.includes(UserRole.Admin);
        this.authService
          .profile(user._id?.toString() as string)
          .subscribe((user) => {
            this.loggedInUser = user;
          });
      }
    });
  }

  CanMakePrediction(fixture: Fixture): boolean {
    // Check if the fixture kickoff time is at least 1 hour in the future
    const now = new Date();
    const kickOff = new Date(fixture.kickOffDate);
    const diff = kickOff.getTime() - now.getTime();
    const diffHours = Math.ceil(diff / (1000 * 60 * 60));

    // Check if the user has already made a prediction for this fixture
    const hasPrediction = this.loggedInUser?.predictions?.some(
      (p) => p.fixture._id === fixture._id
    );

    return diffHours > 1 && !hasPrediction;
  }

  CanScoreBeSet(fixture: Fixture): boolean {
    // Check if the fixture is in the past
    const now = new Date();
    const kickOff = new Date(fixture.kickOffDate);
    const diff = kickOff.getTime() - now.getTime();
    const diffHours = Math.ceil(diff / (1000 * 60 * 60));

    // Check if the fixture has already been scored
    return (
      diffHours < 0 &&
      !fixture.actualAwayScore &&
      !fixture.actualHomeScore &&
      !fixture.actualHalfTimeScore
    );
  }

  HomeTeamWon(fixture: Fixture): boolean {
    if (fixture.actualHomeScore != null && fixture.actualAwayScore != null) {
      return fixture.actualHomeScore > fixture.actualAwayScore;
    }
    return false;
  }

  AwayTeamWon(fixture: Fixture): boolean {
    if (fixture.actualHomeScore != null && fixture.actualAwayScore != null) {
      return fixture.actualAwayScore > fixture.actualHomeScore;
    }
    return false;
  }

  AsTeamArray(): Team[] {
    return this.league.teams as Team[];
  }
}
