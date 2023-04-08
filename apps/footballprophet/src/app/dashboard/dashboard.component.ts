import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { League, Pool, User, UserRole } from '@footballprophet/domain';
import { SuggestedPool } from 'libs/domain/src/lib/SuggestedPool';

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
    private activatedRoute: ActivatedRoute
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
    // Set timeout to simulate slow connection
    this.isLoading = true;

    setTimeout(() => {
      this.authService.profile(id).subscribe((user) => {
        this.user = user;
        this.isLoading = false;
      });
    }, 500);
  }

  LoadLeagueScores(id: string) {
    this.authService.scores(id).subscribe((scores) => {
      console.log(scores);
      this.leagueScores = scores;
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
}
