import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Fixture, League } from '@footballprophet/domain';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class FixtureService {
  constructor(private http: HttpClient) { }

  public CreateFixure(fixture: Fixture): Observable<Fixture> {
    return this.http
      .post(`${environment.api_url}/fixtures`, fixture, {
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

  public UpdateFixture(fixture: Fixture): Observable<Fixture> {
    return this.http
      .put(`${environment.api_url}/fixtures/${fixture._id}`, fixture, {
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
