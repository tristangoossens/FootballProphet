import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { League, Team } from '@footballprophet/domain';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class LeagueService {
  constructor(private http: HttpClient) {}

  public GetLeagues(offset: number, limit: number): Observable<League[]> {
    return this.http
      .get(`${environment.api_url}/leagues?limit=${limit}&offset=${offset}`)
      .pipe(
        map((resp: any) => {
          return resp.data;
        })
      );
  }

  public GetLeagueById(id: string): Observable<League> {
    return this.http.get(`${environment.api_url}/leagues/${id}`).pipe(
      map((resp: any) => {
        return resp.data;
      })
    );
  }

  public CreateLeague(league: League): Observable<League> {
    return this.http
      .post(`${environment.api_url}/leagues`, league, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .pipe(
        map((resp: any) => {
          return resp.data;
        })
      );
  }

  public UpdateLeague(league: League): Observable<League> {
    return this.http
      .put(`${environment.api_url}/leagues/${league._id}`, league, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .pipe(
        map((resp: any) => {
          return resp.data;
        })
      );
  }

  public AddTeamToLeague(leagueId: string, team: Team): Observable<League> {
    return this.http
      .post(`${environment.api_url}/leagues/${leagueId}/teams`, team, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .pipe(
        map((resp: any) => {
          return resp.data;
        })
      );
  }
}
