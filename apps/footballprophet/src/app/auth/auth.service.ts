import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Identity, League, User, UserRole } from '@footballprophet/domain';
import { environment } from 'apps/footballprophet/src/environments/environment';
import { BehaviorSubject, map, Observable, of } from 'rxjs';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  private _isLoggedin$ = new BehaviorSubject<boolean>(false);
  public isLoggedin$ = this._isLoggedin$.asObservable();

  private _isAdmin$ = new BehaviorSubject<boolean>(false);
  public isAdmin$ = this._isAdmin$.asObservable();

  private _currentUser$ = new BehaviorSubject<User | undefined>(undefined);
  public currentUser$ = this._currentUser$.asObservable();

  private readonly TOKEN = 'token';

  constructor(private http: HttpClient, private router: Router) {
    const token = localStorage.getItem(this.TOKEN);
    this._isLoggedin$.next(!!token);

    if (!!token) {
      const user: User = jwt_decode(token);
      this._isAdmin$.next(user.roles.includes(UserRole.Admin));
      this._currentUser$.next(user);
    } else {
      this._isAdmin$.next(false);
      this._currentUser$.next(undefined);
    }
  }

  public login(userCredentials: Identity): Observable<string | undefined> {
    return this.http
      .post<Identity>(`${environment.api_url}/auth/login`, userCredentials)
      .pipe(
        map((resp: any) => {
          localStorage.setItem(this.TOKEN, resp.data.access_token);
          this._isLoggedin$.next(true);
          const user: User = jwt_decode(resp.data.access_token);
          this._isAdmin$.next(user.roles.includes(UserRole.Admin));
          this._currentUser$.next(user);
          return resp.data.access_token;
        })
      );
  }

  public register(userInfo: User): Observable<string | undefined> {
    return this.http
      .post<User>(`${environment.api_url}/auth/register`, userInfo)
      .pipe(
        map((resp: any) => {
          return resp.message;
        })
      );
  }

  public logout(): void {
    this.router.navigate(['/']).then(() => {
      localStorage.removeItem(this.TOKEN);
      this._isLoggedin$.next(false);
      this._isAdmin$.next(false);
      this._currentUser$.next(undefined);
    });
  }

  public profile(userId: string) {
    return this.http
      .get<User>(`${environment.api_url}/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(this.TOKEN)}`,
        },
      })
      .pipe(
        map((resp: any) => {
          return resp.data;
        })
      );
  }

  public scores(userId: string) {
    return this.http
      .get<{ _id: { league: League }; totalScore: number }>(
        `${environment.api_url}/users/${userId}/scores`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(this.TOKEN)}`,
          },
        }
      )
      .pipe(
        map((resp: any) => {
          return resp.data;
        })
      );
  }
}
