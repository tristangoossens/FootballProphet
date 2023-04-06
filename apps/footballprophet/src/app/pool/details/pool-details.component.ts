import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AlertService } from '../../shared/alert/alert.service';
import { PoolService } from '../pool.service';
import { Pool, User } from '@footballprophet/domain';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { ObjectId } from 'mongoose';
import { Clipboard } from '@angular/cdk/clipboard';
import { DialogComponent } from '../../shared/dialog/dialog.component';
import { PoolDialogComponent } from '../dialog/pool-dialog.component';

@Component({
  selector: 'footballprophet-pool-details',
  templateUrl: './pool-details.component.html',
  styleUrls: ['./pool-details.component.scss'],
})
export class PoolDetailComponent implements OnInit {
  public loggedInUser!: User | undefined;

  public pool: Pool = {} as Pool;
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
        this.GetPoolScoreBoardById(id);
      }
    });
  }

  public GetPoolById(id: string): void {
    this.poolService.GetPoolById(id).subscribe(
      (pool) => {
        this.pool = pool;
      },
      (error) => {
        this.alertService.AlertError(error.message);
      }
    );
  }

  public GetPoolScoreBoardById(id: string): void {
    this.poolService.GetPoolScoreBoardById(id).subscribe(
      (scoreBoard) => {
        this.scoreBoard = scoreBoard.map((entry, index) => {
          return { ...entry, position: index };
        });
      },
      (error) => {
        this.alertService.AlertError(error.message);
      }
    );
  }

  public OpenJoinPoolDialog(): void {
    const id = (this.pool._id as ObjectId).toString();

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
      this.poolService.JoinPool(id.toString()).subscribe(() => {
        this.alertService.AlertSuccess('You have successfully joined the pool');
        this.GetPoolById(id);
        this.GetPoolScoreBoardById(id);
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
        const poolId = (this.pool._id as ObjectId).toString();
        const userId = (user._id as ObjectId).toString();

        this.poolService.KickFromPool(poolId, userId).subscribe(() => {
          this.alertService.AlertSuccess(
            `You have successfully kicked ${user.username} from this pool`
          );
          this.GetPoolById(poolId);
          this.GetPoolScoreBoardById(poolId);
        });
      }
    });
  }

  public OpenPoolEditDialog(): void {
    const dialogRef = this.dialog.open(PoolDialogComponent, {
      disableClose: true,
      data: this.pool,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result == true) {
        const poolId = (this.pool._id as ObjectId).toString();

        this.poolService.UpdatePool(this.pool).subscribe(
          (pool) => {
            this.alertService.AlertSuccess('Pool updated successfully');
            this.GetPoolById(poolId);
            this.GetPoolScoreBoardById(poolId);
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
