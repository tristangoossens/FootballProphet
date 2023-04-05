import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { League } from '@footballprophet/domain';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class LeagueService {
    constructor(private http: HttpClient) { }

    public GetLeagues(offset: number, limit: number): Observable<League[]> {
        return this.http.get(`${environment.api_url}/leagues`)
            .pipe(
                map((resp: any) => {
                    return resp.data;
                })
            );
    }
}
