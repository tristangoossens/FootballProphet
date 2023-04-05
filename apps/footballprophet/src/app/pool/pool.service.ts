import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pool } from '@footballprophet/domain';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class PoolService {
  constructor(private http: HttpClient) {}

  public GetPools(offset: number, limit: number): Observable<Pool[]> {
    // TODO: Implement offset and limit
    return this.http
      .get(`${environment.api_url}/pools`, {
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

  public GetPoolById(id: string): Observable<Pool> {
    console.log(localStorage.getItem('token'));
    // Add auth header with jwt token
    return this.http
      .get(`${environment.api_url}/pools/${id}`, {
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

  public JoinPool(id: string): Observable<Pool> {
    return this.http
      .post(`${environment.api_url}/pools/${id}/join`, null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .pipe(
        map((resp: any) => {
          return resp.message;
        })
      );
  }

  public KickFromPool(poolId: string, userId: string): Observable<Pool> {
    return this.http
      .delete(`${environment.api_url}/pools/${poolId}/kick/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .pipe(
        map((resp: any) => {
          return resp.message;
        })
      );
  }
}