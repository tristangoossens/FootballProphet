import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LeagueComponent } from './league.component';
import { LeagueService } from './league.service';
import { AuthService } from '../auth/auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AlertService } from '../shared/alert/alert.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { User, UserRole } from '@footballprophet/domain';
import { Observable } from 'rxjs';
import { LeagueDialogComponent } from './dialog/league-dialog.component';
import { MatIcon } from '@angular/material/icon';
import { MatProgressBar } from '@angular/material/progress-bar';

describe('LEAGUE LIST COMPONENT TESTS', () => {
  let component: LeagueComponent;
  let fixture: ComponentFixture<LeagueComponent>;
  let leagueService: LeagueService;
  let authService: AuthService;
  let alertService: AlertService;
  let snackBar: MatSnackBar;
  let matDialog: MatDialog;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LeagueComponent, MatIcon, MatProgressBar],
      providers: [
        LeagueService,
        AuthService,
        AlertService,
        { provide: MatSnackBar, useValue: {} },
        { provide: MatDialog, useValue: {} },
      ],
      imports: [HttpClientTestingModule],
    }).compileComponents();

    leagueService = TestBed.inject(LeagueService);
    authService = TestBed.inject(AuthService);
    alertService = TestBed.inject(AlertService);
    snackBar = TestBed.inject(MatSnackBar);
    matDialog = TestBed.inject(MatDialog);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeagueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Component should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('Should call LoadLeagues', () => {
      const spy = jest.spyOn(component, 'LoadLeagues');
      component.ngOnInit();
      expect(spy).toHaveBeenCalled();
    });

    it('Should show a progress bar', () => {
      component.ngOnInit();
      expect(component.isLoading).toBe(true);

      const progressBar =
        fixture.nativeElement.querySelector('mat-progress-bar');

      expect(progressBar).toBeTruthy();
    });
  });
});
