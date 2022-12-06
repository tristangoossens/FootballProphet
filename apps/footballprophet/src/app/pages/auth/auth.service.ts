import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Identity, User } from '@footballprophet/domain';
import { environment } from 'apps/footballprophet/src/environments/environment';
import { BehaviorSubject, map, Observable, of } from 'rxjs';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _isLoggedin$ = new BehaviorSubject<boolean>(false);
  public isLoggedin$ = this._isLoggedin$.asObservable();

  private _currentUser$ = new BehaviorSubject<User | undefined>(undefined);
  public currentUser$ = this._currentUser$.asObservable();

  private readonly TOKEN = 'token';

  constructor(private http: HttpClient, private router: Router) {
    const token = localStorage.getItem(this.TOKEN);
    this._isLoggedin$.next(!!token);
    !!token ? this._currentUser$.next(jwt_decode(token)) : this._currentUser$.next(undefined);
  }

  public login(userCredentials: Identity): Observable<string | undefined> {
    return this.http.post<Identity>(`${environment.api_url}/auth/login`, userCredentials)
      .pipe(
        map((data: any) => {
          localStorage.setItem(this.TOKEN, data.access_token);
          this._isLoggedin$.next(true);
          this._currentUser$.next(jwt_decode(data.access_token));
          return data.access_token;
        })
      ); 
  }

  public logout(): void {
    this.router.navigate(['/']).then(() => {
      localStorage.removeItem(this.TOKEN);
      this._isLoggedin$.next(false);
      this._currentUser$.next(undefined);
    });	
  }
}
