import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { League } from '@footballprophet/domain';
import { environment } from 'apps/footballprophet/src/environments/environment';
import { map, Observable } from 'rxjs';

@Injectable()
export class LeagueService {
  constructor(
    private http: HttpClient
  ) { }

  public list(): Observable<League[] | undefined> {
    return this.http.get<League[]>(`${environment.api_url}/leagues`)
  }
}
