import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AlertService } from '../../shared/alert/alert.service';
import { PoolService } from '../pool.service';
import { League, Pool, User } from '@footballprophet/domain';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { ObjectId } from 'mongoose';
import { Clipboard } from '@angular/cdk/clipboard';
import { DialogComponent } from '../../shared/dialog/dialog.component';
import { PoolDialogComponent } from '../dialog/pool-dialog.component';
import { environment } from 'apps/footballprophet/src/environments/environment';

@Component({
  selector: 'footballprophet-pool-details',
  templateUrl: './pool-details.component.html',
  styleUrls: ['./pool-details.component.scss'],
})
export class PoolDetailComponent implements OnInit {
  public loggedInUser!: User | undefined;
  public isLoading: boolean = false;
  public pool: Pool = {} as Pool;
  public appUrl = environment.application_url;
  public scoreBoard: any[] = []; // TODO: Create ScoreBoard interface
  public displayedColumnsMembers: string[] = ['avatarUrl', 'username', 'id'];
  public displayedColumnsScoreboard: string[] = [
    'position',
    'avatarUrl',
    'username',
    'points',
  ];

  constructor(
    private poolService: PoolService,
    private alertService: AlertService,
    private currentRoute: ActivatedRoute,
    private authService: AuthService,
    private dialog: MatDialog,
    private clipboard: Clipboard
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe((user) => {
      this.loggedInUser = user;
    });

    this.currentRoute.paramMap.subscribe((params) => {
      const id = params.get('poolId');
      if (id) {
        this.GetPoolById(id);
      }
    });
  }

  public GetPoolById(id: string): void {
    // Add a timeout to simulate a slow connection
    this.isLoading = true;

    this.poolService.GetPoolById(id).subscribe(
      (pool) => {
        this.GetPoolScoreBoardById(id);
        this.pool = pool;
        this.isLoading = false;
      },
      (error) => {
        this.alertService.AlertError(error.message);
        this.isLoading = false;
      }
    );
  }

  public GetPoolScoreBoardById(id: string): void {
    this.poolService.GetPoolScoreBoardById(id).subscribe(
      (scoreBoard) => {
        this.scoreBoard = scoreBoard.map((entry, index) => {
          return { ...entry, position: index };
        });

        // Sort by points descending
        this.scoreBoard.sort((a, b) => {
          return b.points - a.points;
        });
      },
      (error) => {
        this.alertService.AlertError(error.message);
      }
    );
  }

  public OpenJoinPoolDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      disableClose: true,
      data: {
        imageUrl: this.pool.logoUrl,
        title: 'Join Pool',
        method: 'Join',
        message: 'Are you sure you want to join this pool?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.poolService.JoinPool(this.pool._id!.toString()).subscribe(() => {
        this.alertService.AlertSuccess('You have successfully joined the pool');
        this.GetPoolById(this.pool._id!.toString());
      });
    });
  }

  public OpenKickFromPoolDialog(user: User): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      disableClose: true,
      data: {
        imageUrl: user.avatarUrl,
        title: 'Kick From Pool',
        method: 'Kick',
        message: `Are you sure you want to kick ${user.username} from this pool?`,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.poolService
          .KickFromPool(this.pool._id!.toString(), user._id!.toString())
          .subscribe(() => {
            this.alertService.AlertSuccess(
              `You have successfully kicked ${user.username} from this pool`
            );
            this.GetPoolById(this.pool._id!.toString());
          });
      }
    });
  }

  public OpenPoolEditDialog(): void {
    const dialogRef = this.dialog.open(PoolDialogComponent, {
      data: {
        pool: Object.assign({}, this.pool),
        user: this.loggedInUser,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.poolService.UpdatePool(result).subscribe(
          (_) => {
            this.alertService.AlertSuccess('Pool updated successfully');
            this.GetPoolById(this.pool._id!.toString());
          },
          (error) => {
            this.alertService.AlertError(error.message);
          }
        );
      }
    });
  }

  public CopyInviteUrl(): void {
    const inputElement = document.querySelector('input') as HTMLInputElement;
    inputElement.select();
    this.clipboard.copy(inputElement.value);
    this.alertService.AlertSuccess('Invite link copied to clipboard');
  }

  public AsUserArray(): User[] {
    return this.pool.members as User[];
  }

  public AsLeague(): League {
    return this.pool.league as League;
  }

  public PoolOwnerAsUser(): User {
    return this.pool.owner as User;
  }

  public IsAlreadyMember(user: User): boolean {
    const members = this.pool.members as User[];
    return members.some((member) => member._id === user._id);
  }

  public IsPoolOwner(user: User): boolean {
    return (this.pool.owner as User)._id === user._id;
  }
}
