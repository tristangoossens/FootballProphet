import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import {
  Fixture,
  League,
  Pool,
  Prediction,
  User,
  UserRole,
} from '@footballprophet/domain';
import { SuggestedPool } from 'libs/domain/src/lib/SuggestedPool';
import { AlertService } from '../shared/alert/alert.service';

@Component({
  selector: 'footballprophet-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public user?: User;
  public leagueScores?: any[];
  public isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.LoadLeagueScores(id);
        this.LoadUser(id);
      }
    });
  }

  LoadUser(id: string) {
    this.isLoading = true;

    this.authService.profile(id).subscribe(
      (user) => {
        this.user = user;
        this.isLoading = false;
      },
      (error) => {
        this.alertService.AlertError(error.error.message);
        this.isLoading = false;
      }
    );
  }

  LoadLeagueScores(id: string) {
    this.authService.scores(id).subscribe((scores) => {
      this.leagueScores = scores.sort((a: any, b: any) => {
        return b.totalPoints - a.totalPoints;
      });
    });
  }

  IsAdmin(): boolean {
    return this.user!.roles.includes(UserRole.Admin);
  }

  IsPoolOwner(pool: Pool): boolean {
    return pool.owner == this.user?._id;
  }

  AsPoolArray() {
    return this.user!.pools as Pool[];
  }

  AsSuggestedPoolArray() {
    return this.user!.suggestedPools as SuggestedPool[];
  }

  AsPredictionsArray() {
    return this.user!.predictions as Prediction[];
  }

  AsFixture(prediction: Prediction) {
    return prediction.fixture as Fixture;
  }

  AsLeague(fixture: Fixture) {
    return fixture.league as League;
  }

  IsFixtureFinished(fixture: Fixture): boolean {
    // Check if the fixture is in the past
    const now = new Date();
    const kickOff = new Date(fixture.kickOffDate);
    const diff = kickOff.getTime() - now.getTime();
    const diffHours = Math.ceil(diff / (1000 * 60 * 60));

    // Check if the fixture has already been scored
    return diffHours < 0;
  }
}
