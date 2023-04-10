import { LeagueService } from './league.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '../../environments/environment';
import { League, Team } from '@footballprophet/domain';
import mongoose from 'mongoose';

describe('UI LEAGUE SERVICE TESTS', () => {
  let service: LeagueService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LeagueService],
    });

    service = TestBed.inject(LeagueService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('Should be created', () => {
    expect(service).toBeTruthy();
  });

  it('GetLeagues: Should make a GET request to the api', () => {
    service.GetLeagues(0, 10).subscribe((resp) => {
      expect(resp).toBeTruthy();
    });

    const req = httpMock.expectOne(
      environment.api_url + '/leagues?limit=10&offset=0'
    );
    expect(req.request.method).toEqual('GET');
  });

  it('GetLeagueById: Should make a GET request to the api', () => {
    service.GetLeagueById('64328638f2e0588fe402e35a').subscribe((resp) => {
      expect(resp).toBeTruthy();
    });

    const req = httpMock.expectOne(
      environment.api_url + '/leagues/64328638f2e0588fe402e35a'
    );
    expect(req.request.method).toEqual('GET');
  });

  describe('CreateLeague', () => {
    it('Should return a success message', () => {
      service.CreateLeague({} as League).subscribe((resp) => {
        expect(resp).toBeTruthy();
      });

      const req = httpMock.expectOne(environment.api_url + '/leagues');
      expect(req.request.method).toEqual('POST');
    });

    it('Should include a authorization token', () => {
      const bearerToken = 'test-token';
      localStorage.setItem('token', bearerToken); // set token in localStorage

      service.CreateLeague({} as League).subscribe((resp) => {
        expect(resp).toBeTruthy();
      });

      const req = httpMock.expectOne(environment.api_url + '/leagues');
      expect(req.request.headers.has('Authorization')).toBeTruthy();
      expect(req.request.headers.get('Authorization')).toBe(
        `Bearer ${bearerToken}`
      );
    });
  });

  describe('UpdateLeague', () => {
    it('Should return a success message', () => {
      service
        .UpdateLeague({
          _id: '64328638f2e0588fe402e35a' as any,
        } as League)
        .subscribe((resp) => {
          expect(resp).toBeTruthy();
        });

      const req = httpMock.expectOne(
        environment.api_url + '/leagues/64328638f2e0588fe402e35a'
      );
      expect(req.request.method).toEqual('PUT');
    });

    it('Should include a authorization token', () => {
      const bearerToken = 'test-token';
      localStorage.setItem('token', bearerToken); // set token in localStorage

      service
        .UpdateLeague({
          _id: '64328638f2e0588fe402e35a' as any,
        } as League)
        .subscribe((resp) => {
          expect(resp).toBeTruthy();
        });

      const req = httpMock.expectOne(
        environment.api_url + '/leagues/64328638f2e0588fe402e35a'
      );
      expect(req.request.headers.has('Authorization')).toBeTruthy();
      expect(req.request.headers.get('Authorization')).toBe(
        `Bearer ${bearerToken}`
      );
    });
  });

  describe('AddTeamToLeague', () => {
    it('Should return a success message', () => {
      service
        .AddTeamToLeague('64328638f2e0588fe402e35a', {} as Team)
        .subscribe((resp) => {
          expect(resp).toBeTruthy();
        });

      const req = httpMock.expectOne(
        environment.api_url + '/leagues/64328638f2e0588fe402e35a/teams'
      );
      expect(req.request.method).toEqual('POST');
    });

    it('Should include a authorization token', () => {
      const bearerToken = 'test-token';
      localStorage.setItem('token', bearerToken); // set token in localStorage

      service
        .AddTeamToLeague('64328638f2e0588fe402e35a', {} as Team)
        .subscribe((resp) => {
          expect(resp).toBeTruthy();
        });

      const req = httpMock.expectOne(
        environment.api_url + '/leagues/64328638f2e0588fe402e35a/teams'
      );
      expect(req.request.headers.has('Authorization')).toBeTruthy();
      expect(req.request.headers.get('Authorization')).toBe(
        `Bearer ${bearerToken}`
      );
    });
  });
});
